import React from "react";
import PropTypes from "prop-types";
import Group from "./group";

const PillGroup = ({ ...rest }) => {
    return <Group {...rest} />;
};

PillGroup.defaultProps = {
    navClass: "nav nav-pills",
    propertyValue: "_id",
    propertyText: "name"
};

PillGroup.propTypes = {
    navClass: PropTypes.string,
    items: PropTypes.array.isRequired,
    selectedItem: PropTypes.object,
    onItemSelect: PropTypes.func.isRequired,
    propertyValue: PropTypes.string,
    propertyText: PropTypes.string
};

export default PillGroup;
