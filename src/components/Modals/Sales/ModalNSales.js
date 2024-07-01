import React, { useContext, useState } from 'react'
import UIContext from '../../../context/UI/UIContext'

import './msales.css'
import moment from 'moment';
import { API } from '../../../api/api';
import DBContext from '../../../context/Data/DBContext';

function ModalNSales() {

    const { handleViewModal, handleMessageAlert } = useContext(UIContext);
    const { handleGetProducts } = useContext(DBContext);

    const [ nameProduct, setNameProduct ] = useState('')
    const [ precioU, setPrecioU ] = useState(0)
    const [ precioD, setPrecioD ] = useState(0)
    const [ imageProduct, setImageProduct ] = useState(null)

    const [ isLoading, setIsLoading ] = useState(false)

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const fileExtension = file.name.split('.').pop();
                const validExtensions = ['jpg', 'jpeg', 'png'];

                if (validExtensions.includes(fileExtension)) {
                    setImageProduct(file);
                }
                  
            } catch (err) {
                console.error("Failed to create object URL:", err);
            }
        }
    }

    const handleChangePrice = (value) => {
        setPrecioU(value);
        setPrecioD(value * 12);
    }

    const handleNewProduct = async (e) => {
        e.preventDefault();

        if (!nameProduct || !imageProduct) return;

        setIsLoading(true);

        const currentDay = moment().format('YYYY-MM-DD')

        const data = new FormData();
        data.append('name', nameProduct)
        data.append('precioU', precioU)
        data.append('precioD', precioD)
        data.append('files', imageProduct)
        data.append('date', currentDay)

        try {
            
            const response = await fetch(`${API.URL}/panel/sales/product`, {
                method: 'POST',
                body: data
            })

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Error al guardar')
            }

            setIsLoading(false);
            handleViewModal('');
            setNameProduct('');
            setImageProduct(null)
            handleGetProducts();
            handleMessageAlert('success', result.message, 'bg')

        } catch (error) {
            setIsLoading(false)
            handleMessageAlert('error', error.message, 'bg')
        }

    }

    return (
    
        <div className='__modal' style={{width: '40%'}}>
            <div className='__modal_header'><h2>Agregar nuevo producto</h2></div>
            <div className='__modal_body' style={{height: '300px'}} onSubmit={handleNewProduct}>
                <form className='__wapp_form' id='formAddProduct' method='POST' encType='multipart/form-data'>
                    <div className='__wapp_form_group'>
                        <div className='__wapp_form_control'>
                            <label htmlFor='namep'>Ingresar Nombre del Producto</label>
                            <input type='text' name='namep' id='namep' placeholder='Ingresar Nombre del Producto' onChange={(e) => setNameProduct(e.target.value)} />
                        </div>
                    </div>
                    <div className='__wapp_form_group'>
                        <div className='__wapp_form_control'>
                            <label htmlFor='files'>Seleccionar archivo de imagen</label>
                            <input type='file' name='files' id='files' placeholder='Ingresar Nombre del Producto' accept='image/png, image/jpeg, image/jpg'  onChange={handleChangeFile} />
                        </div>
                    </div>
                    <div className='__wapp_form_group'>
                        <div className='__wapp_form_flex'>
                            <div className='__wapp_form_control'>
                                <label htmlFor='pu'>Precio por Unidad</label>
                                <input type='text' name='pu' id='pu' value={precioU} placeholder='Precio por Unidad'  onChange={(e) => handleChangePrice(e.target.value)} />
                            </div>
                            <div className='__wapp_form_control'>
                                <label htmlFor='pd'>Precio por docena</label>
                                <input type='text' name='pd' id='pd' value={precioD} placeholder='Precio por docena'  onChange={(e) => setPrecioD(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className='__modal_foot'>
                <button className='__btn_clos' onClick={() => handleViewModal('', '')}>Cerrar</button>
                <button type='submit' form='formAddProduct' className='__btn_prim'>{isLoading ? 'Guardando...' : 'Guardar'}</button>
            </div>
        </div>
    
    )

}

export default ModalNSales