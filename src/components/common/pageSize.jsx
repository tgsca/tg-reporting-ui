import React from 'react';
import PropTypes from 'prop-types';

const PageSize = ({ pageSizes, currentPageSize, onPageSizeChange }) => {
    return (
        <React.Fragment>
            Items per page:{' '}
            <div
                className="btn-group btn-group-sm"
                role="group"
                aria-label="Basic example"
            >
                {pageSizes.map(pageSize => (
                    <button
                        key={pageSize}
                        type="button"
                        className={
                            pageSize === currentPageSize
                                ? 'btn btn-sm btn-outline-secondary active'
                                : 'btn btn-sm btn-outline-secondary'
                        }
                        onClick={() => onPageSizeChange(pageSize)}
                    >
                        {pageSize}
                    </button>
                ))}
            </div>
        </React.Fragment>
    );
};

PageSize.propTypes = {
    pageSizes: PropTypes.array.isRequired,
    currentPageSize: PropTypes.number.isRequired,
    onPageSizeChange: PropTypes.func.isRequired
};

export default PageSize;
