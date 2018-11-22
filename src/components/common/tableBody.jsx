import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

class TableBody extends Component {
    renderCell = (item, column) => {
        if (column.content) return column.content(item);
        return _.get(item, column.path);
    };

    render() {
        const { data, columns, propertyTrKey } = this.props;
        return (
            <tbody>
                {data.map(item => (
                    <tr key={item[propertyTrKey]}>
                        {columns.map(column => (
                            <td key={column.path || column.key}>
                                {this.renderCell(item, column)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        );
    }
}

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    propertyTrKey: PropTypes.string
};

TableBody.defaultProps = {
    propertyTrKey: "_id"
};

export default TableBody;
