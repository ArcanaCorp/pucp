import React, { useContext } from 'react'
import UIContext from '../../../context/UI/UIContext'

import './msales.css'
import DBContext from '../../../context/Data/DBContext';

function ModalSales() {

    const { handleViewModal } = useContext(UIContext);
    const { clients, products } = useContext(DBContext);

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
                            <input type='text' name='response' id='response' placeholder='Ingresar Responsable' />
                        </div>
                    </div>
                    <div className='__wapp_form_group'>
                        <div className='__wapp_form_control'>
                            <label htmlFor='client'>Seleccionar Cliente</label>
                            <select className='__select' name='client' id='client'>
                                <option defaultValue={''}>Seleccionar Cliente</option>
                                {clients.map((client) => (
                                    <option key={client.id_client} value={client.id_client}>{client.name_client}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='__wapp_form_group'>
                        <div className='__wapp_form_flex'>
                            <div className='__wapp_form_control'>
                                <label htmlFor='dateStart'>Ingresar Fecha de Inicio</label>
                                <input type='date' name='dateStart' id='dateStart' placeholder='Ingresar responsable' />
                            </div>
                            <div className='__wapp_form_control'>
                                <label htmlFor='dateFinish'>Ingresar Fecha de Entrega</label>
                                <input type='date' name='dateFinish' id='dateFinish' placeholder='Ingresar responsable' />
                            </div>
                        </div>
                    </div>
                    <h2 style={{marginBottom: '1rem'}}>Detalles</h2>
                    <div className='__wapp_form_group'>
                        {products.map((prd) => (
                            <div className='__wapp_form_flex' key={prd.id}>
                                <div className='__wapp_form_control'>
                                    <label htmlFor='prodc'>Producto</label>
                                    <input name='p1' id='p1' value={prd.name} placeholder={prd.name} readOnly />
                                </div>
                                <div className='__wapp_form_control'>
                                    <label>Cantidad</label>
                                    <input type='text' id='' name='' placeholder='Ingresar cantidad' />
                                </div>
                            </div>
                        ))}
                    </div>
                </form>
            </div>
            <div className='__modal_foot'>
                <button className='__btn_clos' onClick={() => handleViewModal('', '')}>Cerrar</button>
            </div>
        </div>
    
    )

}

export default ModalSales