import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { products } from '../utils/products';

const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "#0f3460",
        color: "white",
        borderRadius: "5px",
        border: "none",
        boxShadow: "none",
        width: "200px",
        height: "40px",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#0f3460" : "white",
        color: state.isSelected ? "white" : "#0f3460",
        "&:hover": {
            backgroundColor: "#0f3460",
            color: "white",
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "white",
    }),
};

const FilterSelect = ({ setFilterList }) => {
    const [categoryOptions, setCategoryOptions] = useState([]);

    useEffect(() => {
        // Wait until products are loaded
        const interval = setInterval(() => {
            if (products.length > 0) {
                const categories = [...new Set(products.map(p => p.category))];
                const options = categories.map(category => ({
                    value: category,
                    label: category.charAt(0).toUpperCase() + category.slice(1),
                }));
                setCategoryOptions(options);
                clearInterval(interval); // Stop checking once data is loaded
            }
        }, 100); // Poll every 100ms

        return () => clearInterval(interval);
    }, []);

    const handleChange = (selectedOption) => {
        setFilterList(products.filter(item => item.category === selectedOption.value));
    };

    return (
        <Select
            options={categoryOptions}
            placeholder="Filter By Category"
            styles={customStyles}
            onChange={handleChange}
            isDisabled={categoryOptions.length === 0}
        />
    );
};

export default FilterSelect;
