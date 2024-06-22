import React, { createContext, useState, useEffect, useMemo } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {

    const searchParams = useMemo(() => new URLSearchParams(window.location.search), []);

    const [searchFilter, setSearchFilter] = useState({
        query: searchParams.get('search') || '',
        table: ''
    });
    const [ statusFilter, setStatusFilter] = useState('');

    const handleFilterSearch = (value, table) => setSearchFilter({ query: value, table: table});
    const handleFilterStatus = (value) => setStatusFilter(value);

    useEffect(() => {
        setSearchFilter(prev => ({
            ...prev,
            query: searchParams.get('search') || ''
        }));
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