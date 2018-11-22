import React from "react";
import PropTypes from "prop-types";

const Select = ({ id, label, options, errors, ...rest }) => {
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <select id={id} className="custom-select" {...rest}>
                <option value="" />
                {options.map(option => (
                    <option key={option._id} value={option._id}>
                        {option.name}
                    </option>
                ))}
            </select>
            {errors && <div className="alert alert-danger">{errors}</div>}
        </div>
    );
};

Select.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    errors: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

export default Select;
