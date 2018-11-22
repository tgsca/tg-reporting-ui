import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
    state = { data: {}, errors: {} };

    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options);
        if (!error) return null;

        const errors = {};
        for (let item of error.details) errors[item.context.key] = item.message;

        return errors;
    };

    validateProperty = ({ id, value }) => {
        const obj = { [id]: value };
        const schema = { [id]: this.schema[id] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    };

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit();
    };

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.id] = errorMessage;
        else delete errors[input.id];

        const data = { ...this.state.data };
        data[input.id] = input.value;

        this.setState({ data, errors });
    };

    renderButton(label) {
        return (
            <button disabled={this.validate()} className="btn btn-primary">
                {label}
            </button>
        );
    }

    renderInput(id, label, type = "text") {
        const { data, errors } = this.state;
        return (
            <Input
                id={id}
                label={label}
                type={type}
                value={data[id]}
                errors={errors[id]}
                onChange={this.handleChange}
            />
        );
    }

    renderSelect(id, label, options = []) {
        const { data, errors } = this.state;
        return (
            <Select
                id={id}
                label={label}
                value={data[id]}
                options={options}
                errors={errors[id]}
                onChange={this.handleChange}
            />
        );
    }
}

export default Form;
