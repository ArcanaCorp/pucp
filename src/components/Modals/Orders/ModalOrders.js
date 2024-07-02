import React, { useContext } from 'react'
import { IconCheck } from '@tabler/icons-react';

import UIContext from '../../../context/UI/UIContext'
import DBContext from '../../../context/Data/DBContext';

import './modal.css'
import '../styles.css'

function ModalOrders() {

    const { sales, updateStatusShopping } = useContext(DBContext);
    const { isViewModal, handleViewModal } = useContext(UIContext);

    const info = sales.find((ord) => ord.id === isViewModal.id);

    return (
    
        <div className='__modal'>

            <div className='__modal_header'>
                <h2>{info.company.name}</h2>
            </div>

            <div className='__modal_body'>

                <div className='__col __colA'>

                    <div className='__row'>

                        <div className='__timeline'>

                            <div className='__line'></div>
                            <div className='__time'>
                                <div className='__tim'>
                                    <div className={`__circular ${info.status >= 0 && '__circular--active'}`} onClick={() => updateStatusShopping(info.id, 0)}>{info.status >= 0 && ( <IconCheck/> )}</div>
                                    <h5>Recibido</h5>
                                </div>
                                <div className='__tim'>
                                    <div className={`__circular ${info.status >= 1 && '__circular--active'}`} onClick={() => updateStatusShopping(info.id, 1)}>{info.status >= 1 && ( <IconCheck/> )}</div>
                                    <h5>Proceso</h5>
                                </div>
                                <div className='__tim'>
                                    <div className={`__circular ${info.status >= 2 && '__circular--active'}`} onClick={() => updateStatusShopping(info.id, 2)}>{info.status >= 2 && ( <IconCheck/> )}</div>
                                    <h5>Entregado</h5>
                                </div>
                                <div className='__tim'>
                                    <div className={`__circular ${info.status >= 3 && '__circular--active'}`} onClick={() => updateStatusShopping(info.id, 3)}>{info.status >= 3 && ( <IconCheck/> )}</div>
                                    <h5>Terminado</h5>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className='__row'>

                        <div className='__form'>

                            <div className='__form_group'>

                                <label htmlFor='name'>Responsable</label>
                                <div className='__form_control'>
                                    <input type='text' className='__entry' name='name' id='name' value={info.response} placeholder='Nombre del encargado' readOnly />
                                </div>

                            </div>

                            <div className='__form_group'>

                                <div className='__form_flex'>
                                    <div>
                                        <label htmlFor='name'>Tipo</label>
                                        <div className='__form_control'>
                                            <input type='text' className='__entry' name='name' id='name' value={'Pedido'} placeholder='Nombre del encargado' readOnly />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor='name'>Código</label>
                                        <div className='__form_control'>
                                            <input type='text' className='__entry' name='name' id='name' value={info.code} placeholder='Nombre del encargado' readOnly />
                                        </div>
                                    </div>
                                
                                </div>

                            </div>

                            <div className='__form_group'>
                                
                                <div className='__form_flex'>
                                    <div>
                                        <label htmlFor='name'>Fecha de contratacíon</label>
                                        <div className='__form_control'>
                                            <input type='text' className='__entry' name='name' id='name' value={info.date_start} placeholder='Nombre del encargado' readOnly />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor='name'>Fecha programada de entrega</label>
                                        <div className='__form_control'>
                                            <input type='text' className='__entry' name='name' id='name' value={info.date_finish} placeholder='Nombre del encargado' readOnly />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className='__form_group'>
                                <h3>Detalles</h3>
                                <ul style={{width: '100%', paddingLeft: '1rem', display: 'flex', flexDirection: 'column'}}>
                                    <li style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '.5rem 0rem'}}>
                                        <p style={{fontWeight: 500}}>Costo de envio</p>
                                        <p>s/ {info.precio_envio}</p>
                                    </li>
                                    <li style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '.5rem 0rem'}}>
                                        <p style={{fontWeight: 500}}>Subtotal</p>
                                        <p>s/ {info.subtotal}</p>
                                    </li>
                                    <li style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '.5rem 0rem'}}>
                                        <p style={{fontWeight: 500}}>Impuesto</p>
                                        <p>s/ {info.impuesto}</p>
                                    </li>
                                    <li style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '.5rem 0rem'}}>
                                        <p style={{fontWeight: 500}}>Total</p>
                                        <p>s/ {info.total}</p>
                                    </li>
                                </ul>
                            </div>

                        </div>

                    </div>

                </div>

                <div className='__col __colB'>
                    <h3>N° de pedido {info.code}</h3>
                    <div className='__products'>
                        {info.details.map((dtl, index) => (
                            <div className='__product' key={index}>
                                <div className='__product_img'>
                                    <img src='https://rockfordpe.vtexassets.com/arquivos/ids/305024-800-auto?v=638319590059200000&width=800&height=auto&aspect=true' alt={`Camisa para ${info.company.name}`} />
                                </div>
                                <div className='__product_txt'>
                                    <h4>{dtl.product}</h4>
                                    <div>
                                        <p>Cantidad: <b>{dtl.amount}</b></p>
                                        <p>Precio: <b>s/. {(dtl.precio_u).toFixed(2)}</b></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <div className='__modal_foot'>
                <button className='__btn_clos' onClick={() => handleViewModal('', '')}>Cerrar</button>
            </div>

        </div>
    
    )

}

export default ModalOrders