import React, { createContext, useCallback, useEffect, useState } from "react";
import { API } from "../../api/api";
import moment from "moment";

const DBContext = createContext();

export const DBProvider = ({ children }) => {

    const [ shortCuts, setShortCuts ] = useState([]);
    const [ clients, setClients ] = useState([]);
    const [ products, setProducts ] = useState([]);
    const [ providersList, setProvidersList ] = useState([]);
    const [ sales, setSales ] = useState([]);
    const [ shoppings, setShoppings ] = useState([]);
    const [ quotes, setQuotes ] = useState([]);
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

    const handleAddClient = async (bodyClient) => {
        setClients(prevClients => {
            const updatedClients = [...prevClients, bodyClient];
            localStorage.setItem('clients', JSON.stringify(updatedClients));
            return updatedClients;
        });
    };

    const handleGetProducts = useCallback( async () => {

        try {
            
            const response = await fetch(`${API.URL}/panel/sales/product`)
            const data = await response.json();
            if (data.ok) {
                setProducts(data.products)
            }

        } catch (error) {
            console.log(`Failed to fetch: ${error}`);
        }

    }, [])

    const handleGetProviders = useCallback( async () => {

        try {
            
            const cachedProvider = localStorage.getItem('providers');

            if (cachedProvider) {
                setProvidersList(JSON.parse(cachedProvider))
            } else {

                const response = await fetch(`${API.URL}/panel/shopping/provider`);
                const data = await response.json();
                if (data.ok) {
                    setProvidersList(data.providers);
                    localStorage.setItem('providers', JSON.stringify(data.providers));
                }
            
            }

        } catch (error) {
            console.log(`Failed to fetch: ${error.message}`);
        }

    }, [])

    const handleAddProvider = async (provNew) => {
        setProvidersList(prevProv => {
            const updatesProvider = [provNew, ...prevProv]
            return updatesProvider
        })
    }

    const handleGetSales = useCallback(async () => {
        try {
            
            const response = await fetch(`${API.URL}/panel/sales`)
            const data = await response.json();
            if (data.ok) {
                setSales(data.data)
            }

        } catch (error) {
            console.log(error);
        }
    }, [])

    const handleGetShoppings = useCallback( async () => {
        try {
            
            const cachedShoppings = localStorage.getItem('shoppings')

            if (cachedShoppings) {
                setShoppings(JSON.parse(cachedShoppings))
            } else {
                const response = await fetch(`${API.URL}/panel/shopping`)
                const data = await response.json()
                if (data.ok) {
                    setShoppings(data.shopping)
                    localStorage.setItem('shoppings', JSON.stringify(data.shopping))
                }
            }

        } catch (error) {
            console.log(`Failed to fetch: ${error.message}`);
        }
    }, [])

    const handleAddShopping = async (newShop) => {
        setShoppings(prev => {
            const updateShop = [newShop, ...prev]
            return updateShop;
        })
    }

    const updateStatusShopping = async (id, status) => {
        try {
            
            await fetch(`${API.URL}/panel/sales/status/${id}/${status}`, {
                method: 'PUT'
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.ok) {
                    handleGetSales();
                }
            })
            .catch((error) => {
                console.log(error);
            })

        } catch (error) {
            console.log(error);
        }
    }

    const handleGetQuotes = useCallback(async () => {
        try {
            
            const response = await fetch(`${API.URL}/panel/cotization`)
            const data = await response.json()
            if (data.ok) {
                setQuotes(data.data)
            }

        } catch (error) {
            console.log(error.message);
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

    const handleAddDocs = async (docNew) => {
        setDocs(prevDocs => {
            const updateDocs = [docNew, ...prevDocs];
            return updateDocs;
        })
    }

    const handleRemoveDocs = async (idDoc) => {
        console.log(`Removing ${idDoc}`);
        setDocs(prevDocs => {
            const updatedDocs = prevDocs.filter((doc) => doc.id === idDoc);
            return updatedDocs;
        })
    }

    useEffect(() => {
        if (clients.length === 0) {
            handleGetClients();
        }
    }, [ clients, handleGetClients ])

    useEffect(() => {
        if (products.length === 0) {
            handleGetProducts();
        }
    }, [products, handleGetProducts])

    useEffect(() => {
        if (providersList.length === 0) {
            handleGetProviders();
        }
    }, [providersList, handleGetProviders])

    useEffect(() => {
        if (sales.length === 0) {
            handleGetSales();
        }
    }, [sales, handleGetSales])

    useEffect(() => {
        if (shoppings.length === 0) {
            handleGetShoppings();
        }
    }, [shoppings, handleGetShoppings])

    useEffect(() => {
        if (quotes.length === 0) {
            handleGetQuotes();
        }
    }, [quotes, handleGetQuotes])

    useEffect(() => {
        if (docs.length === 0) {
            handleGetDocs();            
        }
    }, [docs, handleGetDocs])

    const contextValue = {
        shortCuts, handleGetShortcuts,
        clients, handleGetClients,
        handleAddClient,
        products, handleGetProducts,
        providersList,
        handleGetProviders, handleAddProvider,
        sales, handleGetSales,
        shoppings,
        handleAddShopping,
        updateStatusShopping,
        quotes,
        handleGetQuotes,
        handleAddDocs,
        docs, handleGetDocs,
        handleRemoveDocs
    }

    return (
        <DBContext.Provider value={contextValue}>{children}</DBContext.Provider>
    )

}

export default DBContext;