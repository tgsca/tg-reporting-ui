import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const Table = ({
    columns,
    data,
    count,
    itemsLabel,
    propertyTrKey,
    sortColumn,
    onSort
}) => {
    return (
        <table className="table table-hover table-sm">
            <caption>
                Showing {count} {itemsLabel}
            </caption>
            <TableHeader
                columns={columns}
                sortColumn={sortColumn}
                onSort={onSort}
            />
            <TableBody
                data={data}
                columns={columns}
                propertyTrKey={propertyTrKey}
            />
        </table>
    );
};

Table.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    count: PropTypes.number.isRequired,
    itemsLabel: PropTypes.string,
    propertyTrKey: PropTypes.string,
    sortColumn: PropTypes.object,
    onSort: PropTypes.func
};

Table.defaultProps = {
    itemsLabel: 'items'
};

export default Table;
