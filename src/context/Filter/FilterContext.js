import React, { createContext, useState, useEffect, useMemo } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {

    const searchParams = useMemo(() => new URLSearchParams(window.location.search), []);

    const [searchFilter, setSearchFilter] = useState({
        query: searchParams.get('search') || '',
        year: '',
        month: '',
        tipo: '',
        table: ''
    });

    const handleFilterSearch = (value, table) => setSearchFilter({ query: value, table: table});
    const handleFilters = (table, value, filter) => {
        if (searchFilter.table !== '') {
            setSearchFilter(prev => ({
                ...prev,
                [filter]: value
            }))
        } else {
            setSearchFilter(prev => ({
                ...prev,
                [table]: table,
                [filter]: value
            }))
        }
    }

    useEffect(() => {
        setSearchFilter(prev => ({
            ...prev,
            query: searchParams.get('search') || ''
        }));
    }, [searchParams]);

    const contextValue = {
        searchFilter,
        handleFilters,
        handleFilterSearch
    };

    return (
        <FilterContext.Provider value={contextValue}>{children}</FilterContext.Provider>
    );
};

export default FilterContext;