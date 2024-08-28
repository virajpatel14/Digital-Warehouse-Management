import React from 'react';

const Filter = ({ categories, onFilter }) => {
    return (
        <div className="filter-bar">
            <select onChange={(e) => onFilter(e.target.value)}>
                {/* <option value="">All Categories</option> */}
                {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </select>
        </div>
    );
};

export default Filter;
