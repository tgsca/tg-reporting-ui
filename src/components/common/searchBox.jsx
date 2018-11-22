import React from "react";
import Input from "./input";

const SearchBox = ({ value, onChange }) => {
    return (
        <Input
            id="query"
            placeholder="Search..."
            value={value}
            onChange={e => onChange(e.currentTarget.value)}
        />
    );
};

export default SearchBox;
