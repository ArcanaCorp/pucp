import React, { createContext, useCallback, useEffect, useState } from "react";
import { API } from "../../api/api";
import moment from "moment";

const DBContext = createContext();

export const DBProvider = ({ children }) => {

    const [ shortCuts, setShortCuts ] = useState([]);
    const [ clients, setClients ] = useState([]);
    const [ docs, setDocs ] = useState([]);

    const handleGetShortcuts = async () => {

        try {
            
            const currentMonth = moment().format('YYYY-MM-DD')

            const response = await fetch(`${API.URL}/panel/shortcuts/${currentMonth}`)
            const data = await response.json()
            if (data.ok) {
                setShortCuts(data.response)
            }

        } catch (error) {
            console.log(`Error: ${error}`);
        }

    }

    const handleGetClients = useCallback( async () => {

        try {

            const cachedClients = localStorage.getItem('clients');

            if (cachedClients) {
                setClients(JSON.parse(cachedClients));
            } else {
                const response = await fetch(`${API.URL}/panel/client`)
                const data = await response.json();
                if (data.ok) {
                    setClients(data.clients);
                    localStorage.setItem('clients', JSON.stringify(data.clients));
                } else {
                    console.log(data.message);
                }
            }

        } catch (error) {
            console.log(`Failed to fetch: ${error.message}`);
        }
    }, [])

    const handleGetDocs = useCallback(async () => {

        try {
            
            const response = await fetch(`${API.URL}/panel/docs`)
            const data = await response.json();
            if (data.ok) {
                setDocs(data.documents)
            }

        } catch (error) {
            console.log(error.message);
        }

    }, [])

    useEffect(() => {
        if (clients.length === 0) {
            handleGetClients();
        }
    }, [ clients, handleGetClients ])

    useEffect(() => {
        if (docs.length === 0) {
            handleGetDocs();            
        }
    }, [docs, handleGetDocs])

    const contextValue = {
        shortCuts, handleGetShortcuts,
        clients, handleGetClients,
        docs, handleGetDocs
    }

    return (
        <DBContext.Provider value={contextValue}>{children}</DBContext.Provider>
    )

}

export default DBContext;