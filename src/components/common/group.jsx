import React from "react";
import PropTypes from "prop-types";

const Group = ({
    navClass,
    itemLinkClass,
    items,
    selectedItem,
    onItemSelect,
    propertyValue,
    propertyText
}) => {
    return (
        <ul className={navClass}>
            {items.map(item => (
                <li
                    key={item[propertyValue]}
                    className={
                        item === selectedItem
                            ? `${itemLinkClass} active`
                            : `${itemLinkClass}`
                    }
                    onClick={() => onItemSelect(item)}
                    style={{ cursor: "pointer" }}
                >
                    {item[propertyText]}
                </li>
            ))}
        </ul>
    );
};

Group.defaultProps = {
    navClass: "nav",
    itemLinkClass: "nav-item nav-link"
};

Group.propTypes = {
    navClass: PropTypes.string.isRequired,
    itemLinkClass: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    selectedItem: PropTypes.object,
    onItemSelect: PropTypes.func.isRequired,
    propertyValue: PropTypes.string,
    propertyText: PropTypes.string
};

export default Group;
