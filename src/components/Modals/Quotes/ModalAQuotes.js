import React, { useCallback, useContext, useEffect, useState } from 'react'
import UIContext from '../../../context/UI/UIContext'

import './styles.css'
import DBContext from '../../../context/Data/DBContext';
import { API } from '../../../api/api';

function ModalAQuotes() {

    const { handleViewModal, handleMessageAlert } = useContext(UIContext);
    const { clients, products, handleGetQuotes } = useContext(DBContext);
    
    const [ contization, setCotization ] = useState({
        client: '',
        products: {},
        precio_envio: '',
        subtotal: '',
        impuesto: '',
        fecha: '',
    });

    const [ isLoading, setIsLoading ] = useState(false);

    const calculateSubtotal = useCallback(() => {
        const productsSubtotal = Object.values(contization.products).reduce((acc, product) => acc + product.subtotal, 0);
        return productsSubtotal + parseFloat(contization.precio_envio || 0);
    }, [contization.products, contization.precio_envio]);

    const calculateImpuesto = (subtotal) => subtotal * 0.18;

    useEffect(() => {
        const subtotal = calculateSubtotal();
        const impuesto = calculateImpuesto(subtotal);

        setCotization(prev => ({
            ...prev,
            subtotal,
            impuesto
        }));
    }, [calculateSubtotal]);

    const handleChangeClient = (client) => {
        setCotization(prevClient => ({
            ...prevClient,
            client: client
        }))
    }

    const handleChangeDate = (date) => {
        setCotization(prevDate => ({
            ...prevDate,
            fecha: date
        }))
    }

    const handleProductChange = (id, quantity, price) => {
        setCotization((prevCotization) => {
            const newProducts = { ...prevCotization.products };
            if (quantity > 0) {
                newProducts[id] = { quantity, price, subtotal: quantity * price };
            } else {
                delete newProducts[id];
            }
            return { ...prevCotization, products: newProducts };
        });
    };

    const handleChangeEnvio = (value) => {
        setCotization(prevEnv => ({
            ...prevEnv,
            precio_envio: value
        }))
    }

    const handleSendCotization = async () => {

        setIsLoading(true);

        const productsArray = Object.entries(contization.products).map(([id, details]) => ({
            id,
            ...details
        }));

        const payload = {
            ...contization,
            products: productsArray,
            precio_envio: parseFloat(contization.precio_envio) || 0
        };

        try {
            
            await fetch(`${API.URL}/panel/cotization`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.ok) {
                    handleViewModal('', '')
                    handleMessageAlert('success', data.message, 'bg')
                    handleGetQuotes();
                } else {
                    handleMessageAlert('warning', data.message, 'bg')
                }
            })
            .catch((error) => {
                handleMessageAlert('error', error.message, 'bg')
            })
            .finally(() => {
                setIsLoading(false)
            })

        } catch (error) {
            handleMessageAlert('error', error.message, 'bg')
        }

    }

    const subtotal = calculateSubtotal();
    const impuesto = calculateImpuesto(subtotal);
    const total = subtotal + impuesto;

    return (
    
        <div className='__modal' style={{width: '40%'}}>

            <div className='__modal_header'>
                <h2>Agregar Nueva Cotización</h2>
            </div>

            <div className='__modal_body'>

                <form method='POST' className='__xul_form'>

                    <div className='__xul_form_group'>
                        <div className='__xul_form_control'>
                            <label htmlFor='client'>Seleccionar cliente</label>
                            <select className='__select' name='client' id='client' onChange={(e) => handleChangeClient(e.target.value)}>
                                <option defaultValue={''}>Seleccionar al cliente</option>
                                {clients.map((clt) => (
                                    <option key={clt.id_client} value={clt.id_client}>{clt.name_client}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='__xul_form_group'>
                        <h3>Detalles del pedido</h3>
                    </div>
                    <div className='__xul_form_group'>
                        <div className='__xul_form_flex' style={{padding: '.5rem'}}>
                            <div className='__xul_form_control'>
                                <label>Producto</label>
                            </div>
                            <div className='__xul_form_control'>
                                <label>Cantidad</label>
                            </div>
                            <div className='__xul_form_control'>
                                <label>SubTotal</label>
                            </div>
                        </div>
                    </div>
                    {products.map((prd) => (
                        <div className='__xul_form_group' key={prd.id}>
                            <div className='__xul_form_flex' style={{padding: '.5rem'}}>
                                <div className='__xul_form_control'>
                                    <div className='__xul_form_flex'>
                                        <input type='checkbox' onChange={(e) => handleProductChange(prd.id, e.target.checked ? 1 : 0, prd.precio_u)} />
                                        <div className='__detls'>
                                            <p className='__detls_name'>{prd.name}</p>
                                            <p className='__detls_price'>s/ {(prd.precio_u).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='__xul_form_control'>
                                    <input type='text' className='__input' value={contization.products[prd.id]?.quantity} placeholder='Cantidad' onChange={(e) => handleProductChange(prd.id, parseInt(e.target.value) || 0, prd.precio_u)} disabled={!contization.products[prd.id]} />
                                </div>
                                <div className='__xul_form_control'>
                                    <div className='__xul_form_flex'>
                                        <div>
                                            <p>s/{(contization.products[prd.id]?.quantity * prd.precio_u || 0).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='__xul_form_group'>
                        <h3>Información adicional</h3>
                    </div>
                    <div className='__xul_form_group'>
                        <div className='__xul_form_flex'>
                            <div className='__xul_form_control'>
                                <label>Costo de envio</label>
                                <input type='text' className='__input' placeholder='Añade el costo de envio' onChange={(e) => handleChangeEnvio(e.target.value)} />
                            </div>
                            <div className='__xul_form_control'>
                                <label>Ingresar fecha</label>
                                <input type='date' className='__input' onChange={(e) => handleChangeDate(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className='__xul_form_group'>
                        <h3>Detalles</h3>
                    </div>
                    <>
                        <div className='__xul_form_group'>
                            <div className='__xul_form_flex' style={{padding: '.5rem'}}>
                                <div className='__xul_form_control'>
                                    <label>SubTotal</label>
                                </div>
                                <div className='__xul_form_control'>
                                    <label>s/ {subtotal.toFixed(2)}</label>
                                </div>
                            </div>
                        </div>
                        <div className='__xul_form_group'>
                            <div className='__xul_form_flex' style={{padding: '.5rem'}}>
                                <div className='__xul_form_control'>
                                    <label>Impuesto</label>
                                </div>
                                <div className='__xul_form_control'>
                                    <label>s/ {impuesto.toFixed(2)}</label>
                                </div>
                            </div>
                        </div>
                        <div className='__xul_form_group'>
                            <div className='__xul_form_flex' style={{padding: '.5rem'}}>
                                <div className='__xul_form_control'>
                                    <label>Total</label>
                                </div>
                                <div className='__xul_form_control'>
                                    <label>s/ {total.toFixed(2)}</label>
                                </div>
                            </div>
                        </div>
                    </>

                </form>

            </div>

            <div className='__modal_foot'>
                <button className='__btn_clos' onClick={() => handleViewModal('', '')}>Cerrar</button>
                <button className='__btn_prim' onClick={handleSendCotization}>{isLoading ? 'Guardando...' : 'Guardar'}</button>
            </div>

        </div>
    
    )

}

export default ModalAQuotes