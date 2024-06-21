import React, { useContext } from 'react'
import { IconCheck } from '@tabler/icons-react';
import { orders } from "../../../data/ordersData";

import UIContext from '../../../context/UI/UIContext'
import AuthContext from '../../../context/Auth/AuthContext';

import './modal.css'
import '../styles.css'

function ModalOrders() {

    const { isViewModal, handleViewModal } = useContext(UIContext);
    const { isUser } = useContext(AuthContext)

    const info = orders.find((ord) => ord.id === isViewModal.id);

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
                                    <div className={`__circular ${info.status >= 0 && '__circular--active'}`}>
                                        {info.status >= 0 && ( <IconCheck/> )}
                                    </div>
                                    <h5>Recibido</h5>
                                </div>
                                <div className='__tim'>
                                    <div className={`__circular ${info.status >= 1 && '__circular--active'}`}>{info.status >= 1 && ( <IconCheck/> )}</div>
                                    <h5>Proceso</h5>
                                </div>
                                <div className='__tim'>
                                    <div className={`__circular ${info.status >= 2 && '__circular--active'}`}>{info.status >= 2 && ( <IconCheck/> )}</div>
                                    <h5>Terminado</h5>
                                </div>
                                <div className='__tim'>
                                    <div className={`__circular ${info.status === 3 && '__circular--active'}`}>{info.status === 3 && ( <IconCheck/> )}</div>
                                    <h5>Entregado</h5>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className='__row'>

                        <div className='__form'>

                            <div className='__form_group'>

                                <label htmlFor='name'>Responsable</label>
                                <div className='__form_control'>
                                    <input type='text' className='__entry' name='name' id='name' value={isUser.name} placeholder='Nombre del encargado' readOnly />
                                </div>

                            </div>

                            <div className='__form_group'>

                                <div className='__form_flex'>
                                    <div>
                                        <label htmlFor='name'>Responsable</label>
                                        <div className='__form_control'>
                                            <input type='text' className='__entry' name='name' id='name' value={isUser.name} placeholder='Nombre del encargado' readOnly />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor='name'>Responsable</label>
                                        <div className='__form_control'>
                                            <input type='text' className='__entry' name='name' id='name' value={isUser.name} placeholder='Nombre del encargado' readOnly />
                                        </div>
                                    </div>
                                
                                </div>

                            </div>

                            <div className='__form_group'>

                                <label htmlFor='name'>Fecha de contratacíon</label>
                                <div className='__form_control'>
                                    <input type='text' className='__entry' name='name' id='name' value={info.date} placeholder='Nombre del encargado' readOnly />
                                </div>

                            </div>

                            <div className='__form_group'>

                                <label htmlFor='name'>Fecha programada de entrega</label>
                                <div className='__form_control'>
                                    <input type='text' className='__entry' name='name' id='name' value={info.date} placeholder='Nombre del encargado' readOnly />
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div className='__col __colB'>
                    <h3>N° de pedido {info.code}</h3>
                    <div className='__products'>
                        <div className='__product'>
                            <div className='__product_img'>
                                <img src='https://rockfordpe.vtexassets.com/arquivos/ids/305024-800-auto?v=638319590059200000&width=800&height=auto&aspect=true' alt={`Camisa para ${info.company.name}`} />
                            </div>
                            <div className='__product_txt'>
                                <h5>Camisa cuello V</h5>
                                <div>
                                    <p>Cantidad</p>
                                    <select className='__select'>
                                        <option>12</option>
                                        <option>24</option>
                                        <option>36</option>
                                        <option>48</option>
                                        <option>52</option>
                                        <option>64</option>
                                        <option>76</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='__product'>
                            <div className='__product_img'>
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyYNeMag2jU8bW6K_WOSio9Qe0AMQLLSiUdQ&s' alt={`Pantalon para ${info.company.name}`} />
                            </div>
                            <div className='__product_txt'>
                                <h5>Camisa cuello V</h5>
                                <div>
                                    <p>Cantidad</p>
                                    <select className='__select'>
                                        <option>12</option>
                                        <option>24</option>
                                        <option>36</option>
                                        <option>48</option>
                                        <option>52</option>
                                        <option>64</option>
                                        <option>76</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='__product'>
                            <div className='__product_img'>
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQGkGd-YBHM5RBwquJh_04X5fTSeMmaoZt5w&s' alt={`Pantalon para ${info.company.name}`} />
                            </div>
                            <div className='__product_txt'>
                                <h5>Camisa cuello V</h5>
                                <div>
                                    <p>Cantidad</p>
                                    <select className='__select'>
                                        <option>12</option>
                                        <option>24</option>
                                        <option>36</option>
                                        <option>48</option>
                                        <option>52</option>
                                        <option>64</option>
                                        <option>76</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='__product'>
                            <div className='__product_img'>
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNSrcHdvuB5p3GY4S74owrZnxtO1kcTplYaA&s' alt={`Falda para ${info.company.name}`} />
                            </div>
                            <div className='__product_txt'>
                                <h5>Camisa cuello V</h5>
                                <div>
                                    <p>Cantidad</p>
                                    <select className='__select'>
                                        <option>12</option>
                                        <option>24</option>
                                        <option>36</option>
                                        <option>48</option>
                                        <option>52</option>
                                        <option>64</option>
                                        <option>76</option>
                                    </select>
                                </div>
                            </div>
                        </div>
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