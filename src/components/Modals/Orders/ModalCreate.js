import React, { useContext, useState } from 'react'
import UIContext from '../../../context/UI/UIContext'
import DBContext from '../../../context/Data/DBContext'

import './modalcreate.css'
import { API } from '../../../api/api'

function ModalCreate() {

    const { handleViewModal, handleMessageAlert } = useContext(UIContext) 
    const { providersList, handleAddShopping } = useContext(DBContext);

    const [ formData, setFormData ] = useState({
        proveedor: '',
        tipo: '',
        insumo: '',
        total: '',
        date: '',
        codeVoleta: ''
    })
    const [ choosedFile, setChoosedFile ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(false);

    const gastosList = {
        'Administrativo': ['Transporte', 'Comida', 'Alojamiento'],
        'Productivo': ['Ploteo', 'Bordado', 'Estampado', 'Proceso de corte', 'Otro']
    }

    const handleChangeFile = (e) => {
        const file = e.target.files[0]
        if (file) {
            try {
                const fileExtension = file.name.split('.').pop();
                const validExtensions = ['pdf', 'jpg', 'jpeg', 'png'];

                if (validExtensions.includes(fileExtension)) {
                    setChoosedFile(file);
                } else {
                    console.log('Unsupported file type.');
                }
            } catch (err) {
                console.error("Failed to create object URL:", err);
            }
        }
    }

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleNewShopping = async (e) => {
        
        e.preventDefault();

        if (!formData.proveedor || !formData.tipo || !formData.insumo || !formData.total || !formData.date) return handleMessageAlert('warning', 'Completa todos los campos', 'bg'); 

        setIsLoading(true);

        const data = new FormData();
        data.append('proveedor', formData.proveedor)
        data.append('tipo', formData.tipo)
        data.append('insumo', formData.insumo)
        data.append('total', formData.total)
        data.append('date', formData.date)
        
        if (formData.codeVoleta) {
            data.append('codeVoleta', formData.codeVoleta);
        }

        if (choosedFile) {
            data.append('file', choosedFile);
        }

        try {
            
            const response = await fetch(`${API.URL}/panel/shopping`, {
                method: 'POST',
                body: data
            })

            const result = await response.json()

            if (!result.ok) throw new Error(result.message || `Failed to fetch shopping`)

            setIsLoading(false)
            setFormData({
                proveedor: '',
                tipo: '',
                insumo: '',
                total: '',
                date: '',
                codeVoleta: ''
            })
            setChoosedFile(null)
            handleViewModal('', '')
            handleMessageAlert('success', result.message, 'bg')
            handleAddShopping(result.shopping)
        
        } catch (error) {
            handleMessageAlert('error', error.message, 'bg')    
        } finally {
            setIsLoading(false)
        }
        
    }

    return (
    
        <div className='__modal' style={{width: '40%'}}>
            <div className='__modal_header'>
                <h2>Agregar Nueva Compra</h2>
            </div>
            <div className='__modal_body'>
                <div className='__fw_form_' id='newShopping'>
                    <div className='__fw_form_group_'>
                        <div className='__fw_form_control_'>
                            <label htmlFor='proveedor'>Ingresar Proveedor</label>
                            <select name='proveedor' id='proveedor' onChange={(e) => handleChangeInput(e)}>
                                <option value={''}>Seleccionar Proveedores</option>
                                {providersList.map((prv) => (
                                    <option value={prv.id_proveedor} key={prv.id_proveedor}>{prv.name_proveedor}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='__fw_form_group_'>
                        <div className='__fw_form_flex_'>
                            <div className='__fw_form_control_'>
                                <label htmlFor='tipo'>Seleccionar tipo de compra</label>
                                <select name='tipo' id='tipo' onChange={(e) => handleChangeInput(e)}>
                                    <option defaultValue={''}>Seleccionar tipo de gasto o compra</option>
                                    <option value={'Administrativo'}>Administrativo</option>
                                    <option value={'Productivo'}>Productivo</option>
                                </select>
                            </div>
                            <div className='__fw_form_control_'>
                                <label>Seleccionar insumo o servicio comprado</label>
                                <select name='insumo' id='insumo' onChange={(e) => handleChangeInput(e)}>
                                    <option defaultValue={''}>Seleccionar insumo o servicio comprado</option>
                                    {gastosList[formData.tipo] && gastosList[formData.tipo].map((gasto, index) => (
                                        <option key={index} value={gasto}>{gasto}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='__fw_form_group_'>
                        <div className='__fw_form_flex_'>
                            <div className='__fw_form_control_'>
                                <label htmlFor='total'>Ingresa el costo Total</label>
                                <input type='text' name='total' id='total' placeholder='Ingresa el costo Total' aria-placeholder='Ingresa el costo Total' onChange={(e) => handleChangeInput(e)} />
                            </div>
                            <div className='__fw_form_control_'>
                                <label htmlFor='date'>Ingresa fecha de compra o adquisición</label>
                                <input type='date' name='date' id='date' onChange={(e) => handleChangeInput(e)} />
                            </div>
                        </div>
                    </div>
                    <div className='__fw_form_group_'>
                        <div className='__fw_form_control_'>
                            <label htmlFor='file'>Subir boleta o factura</label>
                            <input type='file' name='file' id='file' accept=".pdf, .jpg, .jpeg, .png" onChange={handleChangeFile}/>
                        </div>
                    </div>
                    <div className='__fw_form_group_'>
                        <div className='__fw_form_control_'>
                            <label htmlFor='codeVoleta'>Escribir código de voleta</label>
                            <input type='text' name='codeVoleta' id='codeVoleta' placeholder='Escribir código de voleta' aria-placeholder='Escribir código de voleta' onChange={(e) => handleChangeInput(e)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='__modal_foot'>
                <button className='__btn_clos' onClick={() => handleViewModal('', '')}>Cerrar</button>
                <button className='__btn_prim' onClick={handleNewShopping}>{isLoading ? 'Guardando...' : 'Guardar'}</button>
            </div>
        </div>
    
    )

}

export default ModalCreate