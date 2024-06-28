import React, { useState } from 'react';
import useStore from "../store/store";

const Filter = () => {
    const { filters, setFilter } = useStore();
    const [expanded, setExpanded] = useState(false);

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilter(name, type === 'checkbox' ? checked : value);
    };
    const toggleFilter = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="d-flex justify-content-center">
                <div className={`brd-line filterWrapper ${expanded ? 'expanded' : ''}`}>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="useUsername" checked={filters.useUsername}
                            onChange={handleFilterChange}
                        />
                        <label className="form-check-label">
                            Filter by Username
                        </label>
                        <input type="text" name="username" value={filters.username} className="form-control mt-2"
                               disabled={!filters.useUsername}
                               onChange={handleFilterChange}
                        />
                    </div>
                    <div className="form-check mt-3">
                        <input className="form-check-input" type="checkbox" name="useTitle"
                            checked={filters.useTitle}
                            onChange={handleFilterChange}
                        />
                        <label className="form-check-label">
                            Filter by Title
                        </label>
                        <input type="text" name="title" value={filters.title} className="form-control mt-2"
                           onChange={handleFilterChange}
                           disabled={!filters.useTitle}
                        />
                    </div>

                    <div className="form-check mt-3">
                        <input className="form-check-input" type="checkbox" name="useDate" checked={filters.useDate}
                            onChange={handleFilterChange}
                        />
                        <label className="form-check-label">
                            Filter by Date
                        </label>
                        <div className="d-flex mt-2">
                            <input type="date" name="dateFrom" value={filters.dateFrom} className="form-control me-2"
                               onChange={handleFilterChange}
                            />
                            <input type="date" name="dateTo" value={filters.dateTo} className="form-control"
                               onChange={handleFilterChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <button
                type="button"
                className={`btn btn-secondary mb-3 mt-3 ${expanded ? 'collapsed' : ''}`}
                onClick={toggleFilter}>
                {expanded ? 'Collapse Filter' : 'Expand Filter'}
            </button>
        </div>
    );
};

export default Filter;
