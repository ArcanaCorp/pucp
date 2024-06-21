import React, { createContext, useState, useEffect, useMemo } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {

    const searchParams = useMemo(() => new URLSearchParams(window.location.search), []);

    const [searchFilter, setSearchFilter] = useState(searchParams.get('search') || '');
    const [ statusFilter, setStatusFilter] = useState('');

    const handleFilterSearch = (value) => setSearchFilter(value);
    const handleFilterStatus = (value) => setStatusFilter(value);

    useEffect(() => {
        setSearchFilter(searchParams.get('search') || '');
    }, [searchParams]);

    const contextValue = {
        searchFilter,
        handleFilterSearch,
        statusFilter,
        handleFilterStatus
    };

    return (
        <FilterContext.Provider value={contextValue}>{children}</FilterContext.Provider>
    );
};

export default FilterContext;