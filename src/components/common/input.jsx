import React from "react";
import PropTypes from "prop-types";

const Input = ({ id, label, errors, ...rest }) => {
    return (
        <div className="form-group">
            {label && <label htmlFor={id}>{label}</label>}
            <input {...rest} id={id} className="form-control" />
            {errors && <div className="alert alert-danger">{errors}</div>}
        </div>
    );
};

Input.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    errors: PropTypes.string,
    type: PropTypes.string
};

export default Input;
