import React, { useContext, useState } from 'react'
import UIContext from '../../../context/UI/UIContext'

import './modalclients.css'
import { API } from '../../../api/api';
import moment from 'moment';
import DBContext from '../../../context/Data/DBContext';

function ModalClient() {

    const { handleViewModal, handleMessageAlert } = useContext(UIContext);
    const { handleAddClient } = useContext(DBContext);

    const [ client, setClient ] = useState({
        name: '',
        ruc: '',
        contact: '',
        direction: ''
    })

    const [ isLoading, setIsLoading ] = useState(false);

    const handleChangeClient = (e) => {
        const { name, value } = e.target;
        setClient(prev => ({
            ...prev,
            [name]: value
        }));
    };
    

    const handleSaveClient = async () => {

        if (client.name === '' || client.ruc === '' || client.contact === '' || client.direction === '') return handleMessageAlert('warning', 'Completa los campos antes por favor', 'bg');

        setIsLoading(true)

        try {
            
            const curretDay = moment().format('YYYY-MM-DD')

            const formData = new FormData();
            formData.append('name', client.name)
            formData.append('ruc', client.ruc)
            formData.append('contact', client.contact)
            formData.append('direction', client.direction)
            formData.append('date', curretDay)

            await fetch(`${API.URL}/panel/client`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData).toString()
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.ok) {
                    handleViewModal('', '')
                    handleAddClient(data.client);
                    handleMessageAlert('success', data.message, 'bg')
                } else {
                    handleMessageAlert('warning', `Warning: ${data.message}`, 'bg')
                }
            })
            .catch((err) => {
                handleMessageAlert('error', `Error: ${err.message}`, 'bg')
            })
            .finally(() => {
                setIsLoading(false)
            })

        } catch (err) {
            handleMessageAlert('error', `Error: ${err.message}`, 'bg')
        }

    }

    return (
    
        <div className='__modal' style={{width: '40%'}}>

            <div className='__modal_header'>
                <h2>Agregar nuevo cliente</h2>
            </div>
            <div className='__modal_body' style={{height: '300px'}}>

                {!isLoading ? (
                <div className='__wsp_form'>

                    <div className='__wsp_form_group'>
                        <div className='__wsp_form_control'>
                            <input type='text' name='name' id='name' placeholder='Ingresar nombre del cliente' onChange={(e) => handleChangeClient(e)} />
                        </div>
                    </div>
                    <div className='__wsp_form_group'>
                        <div className='__wsp_form_flex'>
                            <div className='__wsp_form_control'>
                                <input type='text' name='ruc' id='ruc' placeholder='Ingresar RUC de cliente' onChange={(e) => handleChangeClient(e)} />
                            </div>
                            <div className='__wsp_form_control'>
                                <input type='text' name='contact' id='contact' placeholder='Ingresar contacto del cliente' onChange={(e) => handleChangeClient(e)} />
                            </div>
                        </div>
                    </div>
                    <div className='__wsp_form_group'>
                        <div className='__wsp_form_control'>
                            <input type='text' name='direction' id='direction' placeholder='Ingresar dirección del cliente' onChange={(e) => handleChangeClient(e)} />
                        </div>
                    </div>

                </div>
                ) : (
                    <div className='__wsp_form_load'>
                        <span className='__loader'></span>
                    </div>
                )}

            </div>
            {!isLoading && (
                <div className='__modal_foot'>
                    <button className='__btn_clos' onClick={() => handleViewModal('', '')}>Cerrar</button>
                    <button className='__btn_prim' onClick={handleSaveClient}>Guardar</button>
                </div>
            )}

        </div>
    
    )

}

export default ModalClient