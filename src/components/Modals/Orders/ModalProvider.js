import React, { useContext, useState } from 'react'
import UIContext from '../../../context/UI/UIContext'
import moment from 'moment';
import { API } from "../../../api/api";
import DBContext from '../../../context/Data/DBContext';

function ModalProvider() {

    const { handleViewModal, handleMessageAlert } = useContext(UIContext) 
    const { handleAddProvider } = useContext(DBContext)
    
    const [ proveedor, setProveedor ] = useState({
        name: '',
        ruc: '',
        contact: '',
        direction: ''
    });
    const [ isLoading, setIsLoading ] = useState(false);

    const handleChangeProveedor = (e) => {
        const { name, value } = e.target;
        setProveedor(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSaveProveedor = async (e) => {

        e.preventDefault()

        if (proveedor.name === '' || proveedor.ruc === '' || proveedor.contact === '' || proveedor.direction === '') return handleMessageAlert('warning', 'Completa los campos antes por favor', 'bg');

        setIsLoading(true);

        try {
            
            const currentDay = moment().format('YYYY-MM-DD')

            const formData = new FormData();
            formData.append('name', proveedor.name)
            formData.append('ruc', proveedor.ruc)
            formData.append('contact', proveedor.contact)
            formData.append('direction', proveedor.direction)
            formData.append('date', currentDay)

            await fetch(`${API.URL}/panel/shopping/provider`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData).toString()
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.ok) {
                    handleViewModal('', '');
                    handleAddProvider(data.proveedor)
                    handleMessageAlert('success', data.message, 'bg')
                } else {
                    handleMessageAlert('warning', data.message, 'bg')
                }
            })
            .catch((err) => {
                handleMessageAlert('error', `Error: ${err.message}`, 'bg')
            })
            .finally(() => {
                setIsLoading(false);
            })

        } catch (err) {
            handleMessageAlert('error', `Error: ${err.message}`, 'bg')
        }
    
    }

    return (
    
        <div className='__modal' style={{width: '40%'}}>
            
            <div className='__modal_header'>
                <h2>Agregar un proveedor</h2>
            </div>

            <div className='__modal_body'>

                <form className='__fw_form_' method='POST' id='formCreateProveedor' onSubmit={handleSaveProveedor}>
                    <div className='__fw_form_group_'>
                        <div className='__fw_form_control_'>
                            <label>Ingresar Proveedor</label>
                            <input type='text' name='name' id='name'  placeholder='Ingresar Proveedor' aria-placeholder='Ingresar Proveedor' onChange={(e) => handleChangeProveedor(e)} />
                        </div>
                    </div>
                    <div className='__fw_form_group_'>
                        <div className='__fw_form_flex_'>
                            <div className='__fw_form_control_'>
                                <label>Ingresa el RUC del Proveedor</label>
                                <input type='text' name='ruc' id='ruc' placeholder='Ingresa el RUC del Proveedor' aria-placeholder='Ingresa el RUC del Proveedor' onChange={(e) => handleChangeProveedor(e)} />
                            </div>
                            <div className='__fw_form_control_'>
                                <label>Ingresa el contacto del Proveedor</label>
                                <input type='text' name='contact' id='contact' placeholder='Ingresa el RUC del Proveedor' aria-placeholder='Ingresa el RUC del Proveedor' onChange={(e) => handleChangeProveedor(e)} />
                            </div>
                        </div>
                    </div>
                    <div className='__fw_form_group_'>
                        <div className='__fw_form_control_'>
                            <label>Ingresar dirección del Proveedor</label>
                            <input type='text' name='direction' id='direction' placeholder='Ingresar dirección del Proveedor' aria-placeholder='Ingresar dirección del Proveedor'  onChange={(e) => handleChangeProveedor(e)}/>
                        </div>
                    </div>
                </form>

            </div>

            <div className='__modal_foot'>
                <button className='__btn_clos' onClick={() => handleViewModal('', '')}>Cerrar</button>
                <button className='__btn_prim' form='formCreateProveedor'>{isLoading ? 'Guardando...' : 'Guardar'}</button>
            </div>

        </div>
    
    )

}

export default ModalProvider