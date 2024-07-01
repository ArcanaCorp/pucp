import React, { useCallback, useContext, useEffect, useState } from 'react'

import UIContext from '../../../context/UI/UIContext'
import DBContext from '../../../context/Data/DBContext';

import './msales.css'
import { API } from '../../../api/api';

function ModalSales() {

    const { handleViewModal, handleMessageAlert } = useContext(UIContext);
    const { clients, products, handleGetSales } = useContext(DBContext);

    const [ salesData, setSalesData ] = useState({
        response: '',
        client: '',
        products: {},
        dateStart: '',
        dateFinish: '',
        precio_envio: '',
        subtotal: '',
        impuesto: '',
    })

    const [ isLoading, setIsLoading ] = useState(false);

    const calculateSubtotal = useCallback(() => {
        const productsSubtotal = Object.values(salesData.products).reduce((acc, product) => acc + product.subtotal, 0);
        return productsSubtotal + parseFloat(salesData.precio_envio || 0);
    }, [salesData.products, salesData.precio_envio]);

    const calculateImpuesto = (subtotal) => subtotal * 0.18;

    useEffect(() => {
        const subtotal = calculateSubtotal();
        const impuesto = calculateImpuesto(subtotal);

        setSalesData(prev => ({
            ...prev,
            subtotal,
            impuesto
        }));
    }, [calculateSubtotal]);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setSalesData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleProductChange = (id, quantity, price) => {
        setSalesData((prevCotization) => {
            const newProducts = { ...prevCotization.products };
            if (quantity > 0) {
                newProducts[id] = { quantity, price, subtotal: quantity * price };
            } else {
                delete newProducts[id];
            }
            return { ...prevCotization, products: newProducts };
        });
    };

    const subtotal = calculateSubtotal();
    const impuesto = calculateImpuesto(subtotal);
    const total = subtotal + impuesto;

    const handleSendPedido = async () => {

        setIsLoading(true);

        const productsArray = Object.entries(salesData.products).map(([id, details]) => ({
            id,
            ...details
        }));

        const payload = {
            ...salesData,
            products: productsArray,
            precio_envio: parseFloat(salesData.precio_envio) || 0
        };

        try {
            
            await fetch(`${API.URL}/panel/sales`, {
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
                    handleGetSales();
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

    return (
    
        <div className='__modal' style={{ width: '40%' }}>
            <div className='__modal_header'>
                <h2>Agregar nueva Venta</h2>
            </div>
            <div className='__modal_body'>
                <form className='__wapp_form' method='POST'>
                    <div className='__wapp_form_group'>
                        <div className='__wapp_form_control'>
                            <label htmlFor='response'>Ingresar Responsable</label>
                            <input type='text' className='__input' name='response' id='response' placeholder='Ingresar Responsable' onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                    <div className='__wapp_form_group'>
                        <div className='__wapp_form_control'>
                            <label htmlFor='client'>Seleccionar Cliente</label>
                            <select className='__select' name='client' id='client' onChange={(e) => handleChange(e)}>
                                <option defaultValue={''}>Seleccionar Cliente</option>
                                {clients.map((client) => (
                                    <option key={client.id_client} value={client.id_client}>{client.name_client}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <>
                        <h2 style={{marginBottom: '1rem'}}>Detalles</h2>
                        <div className='__wapp_form_group'>
                            <div className='__wapp_form_flex'>
                                <div className='__wapp_form_control'><label>Producto</label></div>
                                <div className='__wapp_form_control'><label>Cantidad</label></div>
                                <div className='__wapp_form_control'><label>SubTotal</label></div>
                            </div>
                        </div>
                        <div className='__wapp_form_group'>
                            {products.map((prd) => (
                                <div className='__wapp_form_flex' key={prd.id}>
                                    <div className='__wapp_form_control'>
                                        <div className='__wapp_form_flex'>
                                            <input name='p1' id='p1' type='checkbox' onChange={(e) => handleProductChange(prd.id, e.target.checked ? 1 : 0, prd.precio_u)} />
                                            <div>
                                                <p style={{fontWeight: 500}}>{prd.name}</p>
                                                <p style={{fontSize: '.8rem', color: '#888888'}}>s/. {(prd.precio_u).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='__wapp_form_control'>
                                        <input type='text' className='__input' id='' name='' value={salesData.products[prd.id]?.quantity} placeholder='Ingresar cantidad' onChange={(e) => handleProductChange(prd.id, parseInt(e.target.value) || 0, prd.precio_u)} disabled={!salesData.products[prd.id]} />
                                    </div>
                                    <div className='__wapp_form_control'>
                                        <div>
                                            <div>
                                                <p>s/ {(salesData.products[prd.id]?.quantity * prd.precio_u || 0).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                    <div className='__wapp_form_group'>
                        <div className='__wapp_form_flex'>
                            <div className='__wapp_form_control'>
                                <label htmlFor='dateStart'>Ingresar Fecha de Inicio</label>
                                <input type='date' className='__input' name='dateStart' id='dateStart' placeholder='Ingresar responsable' onChange={(e) => handleChange(e)} />
                            </div>
                            <div className='__wapp_form_control'>
                                <label htmlFor='dateFinish'>Ingresar Fecha de Entrega</label>
                                <input type='date' className='__input' name='dateFinish' id='dateFinish' placeholder='Ingresar responsable' onChange={(e) => handleChange(e)} />
                            </div>
                        </div>
                    </div>
                    <div style={{width: '100%', height: '1px', backgroundColor: '#888888', margin: '1rem 0rem'}}></div>
                    <div className='__wapp_form_group'>
                        <div className='__wapp_form_control'>
                            <div className='__wapp_form_flex' style={{justifyContent: 'flex-end'}}>
                                <p>SubTotal</p>
                                <p style={{padding: '.5rem 1rem', backgroundColor: '#EEEEEE', borderRadius: '5px'}}>s/ {subtotal.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div className='__wapp_form_group'>
                        <div className='__wapp_form_control'>
                            <div className='__wapp_form_flex' style={{justifyContent: 'flex-end'}}>
                                <p>Impuesto</p>
                                <p style={{padding: '.5rem 1rem', backgroundColor: '#EEEEEE', borderRadius: '5px'}}>s/ {impuesto.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div className='__wapp_form_group'>
                        <div className='__wapp_form_control'>
                            <div className='__wapp_form_flex' style={{justifyContent: 'flex-end'}}>
                                <p>Costo Total</p>
                                <p style={{padding: '.5rem 1rem', backgroundColor: '#EEEEEE', borderRadius: '5px'}}>s/ {total.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className='__modal_foot'>
                <button className='__btn_clos' onClick={() => handleViewModal('', '')}>Cerrar</button>
                <button className='__btn_prim' onClick={handleSendPedido}>{isLoading ? 'Guardando...' : 'Guardar'}</button>
            </div>
        </div>
    
    )

}

export default ModalSales