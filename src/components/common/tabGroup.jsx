import React from "react";
import PropTypes from "prop-types";
import Group from "./group";

const TabGroup = ({ ...rest }) => {
    return <Group {...rest} />;
};

TabGroup.defaultProps = {
    propertyValue: "_id",
    propertyText: "name",
    navClass: "nav nav-tabs"
};

TabGroup.propTypes = {
    navClass: PropTypes.string,
    items: PropTypes.array.isRequired,
    selectedItem: PropTypes.object,
    onItemSelect: PropTypes.func.isRequired,
    propertyValue: PropTypes.string,
    propertyText: PropTypes.string
};

export default TabGroup;
