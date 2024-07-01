import React, { useContext, useState } from 'react'
import moment from 'moment';
import 'moment/locale/es';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { API } from '../../../api/api';
import UIContext from '../../../context/UI/UIContext';
import DBContext from '../../../context/Data/DBContext';

function Row({ id, number, name, contact, tipo, response, date }) {

    const { handleMessageAlert } = useContext(UIContext);
    const { handleRemoveDocs } = useContext(DBContext);

    const [ isDelete, setIsDelete ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    const formattedDate = moment(date).format('DD [/] MM [/] YYYY'); // Ejemplo: "May 31, 2024"

    const handleRemove = async (idDoc) => {

        if (!idDoc) return; //

        setIsLoading(true);

        try {

            const response = await fetch(`${API.URL}/panel/docs/${idDoc}`, {
                method: 'DELETE'
            })

            const result = await response.json();

            if (!response.ok) throw new Error(response.message || 'Error fetch response')

                setIsDelete(false);
                handleRemoveDocs(result.id)
                handleMessageAlert('success', result.message, 'bg')
                

        } catch (error) {
            handleMessageAlert('error', error.message, 'bg')
        } finally {
            setIsLoading(false);
        }

    }

    return (
    
        <>
            <div className={`__row_body ${number % 2 === 0 ? '__row_body_bg' : ''}`}>
                <div className='__col __col_nmb'>{number}</div>
                <div className='__col __col_A' style={{textAlign: 'center'}}>
                    <p className='__txt_primary'>{name}</p>
                    <p className='__txt_secondary'>{contact}</p>
                </div>
                <div className='__col' style={{textAlign: 'center'}}><span style={{textTransform: 'uppercase'}}>{tipo}</span></div>
                <div className='__col' style={{textAlign: 'center'}}>
                    <p className='__txt_primary'>{formattedDate}</p>
                    <p className='__txt_secondary'>Agregado por <b>{response}</b></p>
                </div>
                <div className='__col __col-action'>
                    <div className='__col-actions'>
                        <button className='__edit'><IconEdit/></button>
                        <button className='__delete' onClick={() => setIsDelete(!isDelete)}><IconTrash/></button>
                    </div>
                    <div className={`__menu ${isDelete ? '__menu--active' : ''}`}>
                        <p>¿Estas seguro que quieres eliminar?</p>
                        <div style={{width: '100%', display: 'flex', gap: '.5rem'}}>
                            <button className='__btn __btn_cancel' onClick={() => setIsDelete(false)}>No, cancelar</button>
                            <button className='__btn __btn_delete' onClick={() => handleRemove(id)}>{isLoading ? 'Eliminando...' : 'Sí, eliminar'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    
    )

}

export default Row