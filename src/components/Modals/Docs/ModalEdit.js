import React, { useContext, useEffect, useState } from 'react'
import UIContext from '../../../context/UI/UIContext'
import DBContext from '../../../context/Data/DBContext';

import './editdoc.css'
import { API } from '../../../api/api';

function ModalEdit() {

    const { isViewModal, handleViewModal, handleMessageAlert } = useContext(UIContext);
    const { clients, handleGetDocs } = useContext(DBContext);

    const [formData, setFormData] = useState({
        response: '',
        client: '',
        tipodoc: '',
        date: ''
    });

    const [isFile, setIsFile] = useState(null);
    const [fileType, setFileType] = useState('');
    const [error, setError] = useState(null);
    const [choosedFile, setChoosedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isViewModal) {
            setFormData({
                response: isViewModal.response_document || '',
                client: isViewModal.client_document || '',
                tipodoc: isViewModal.tipo_document || '',
                date: isViewModal.fecha_document || ''
            });
            setIsFile(null);
            setChoosedFile(null);
            setError(null);
        }
    }, [isViewModal]);

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const fileExtension = file.name.split('.').pop().toLowerCase();
                const validExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'gif'];

                if (validExtensions.includes(fileExtension)) {
                    const url = URL.createObjectURL(file);
                    setIsFile(url);
                    setFileType(fileExtension);
                    setChoosedFile(file);
                    setError(null);
                } else {
                    setError('Unsupported file type.');
                }
            } catch (err) {
                console.error("Failed to create object URL:", err);
                setError("Failed to preview the file.");
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

    const handleSaveDoc = async (e) => {

        e.preventDefault();

        setError(null);

        setIsLoading(true);

        const data = new FormData();
        if (formData.response) data.append('response_document', formData.response);
        if (formData.client) data.append('client_document', formData.client);
        if (formData.tipodoc) data.append('tipo_document', formData.tipodoc);
        if (formData.date) data.append('fecha_document', formData.date);
        if (choosedFile) data.append('file_document', choosedFile);

        try {
            const response = await fetch(`${API.URL}/panel/docs/${isViewModal.id}`, {
                method: 'PUT',
                body: data,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Error saving document');
            }

            setIsLoading(false);
            handleViewModal('', '');
            setFormData({
                response: '',
                client: '',
                tipodoc: '',
                date: ''
            });
            setIsFile(null);
            setFileType('');
            setError(null);
            handleGetDocs();
            handleMessageAlert('success', result.message, 'bg');

        } catch (error) {
            console.error('Error saving document:', error.message);
            handleMessageAlert('error', error.message, 'bg');
            setError(error.message);
            setIsLoading(false);
        }
    };

    return (
    
        <div className='__modal' style={{width: '40%'}}>

            <div className='__modal_header'>
                <h2>Editar información</h2>
            </div>

            <div className='__modal_body'>

                <form className='__wrp_form' method='POST' id='formEdit' onSubmit={handleSaveDoc}>
                    <div className='__wrp_form_group'>
                        <div>
                            <label htmlFor='response'>Ingresar responsable</label>
                            <div className='__wrp_form_control'>
                                <input type='text' name='response' id='response' placeholder='Ingresar responsable' onChange={(e) => handleChangeInput(e)} />
                            </div>
                        </div>
                    </div>
                    <div className='__wrp_form_group'>
                        <div>
                            <label htmlFor='client'>Institución</label>
                            <div className='__wrp_form_control'>
                                <select name='client' id='client' onChange={(e) => handleChangeInput(e)}>
                                    <option defaultValue={''}>Ingresar Institución</option>
                                    {clients.map((client) => (
                                        <option key={client.id_client} value={client.id_client}>{client.name_client}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='__wrp_form_group'>
                        <div className='__wrp_form_flex'>
                            <div style={{width: '100%'}}>
                                <label htmlFor='tipodoc'>Tipo de documento</label>
                                <div className='__wrp_form_control'>
                                    <select className='__selc' id='tipodoc' name='tipodoc' onChange={(e) => handleChangeInput(e)}>
                                        <option defaultValue={''}>Seleccionar tipo de documento</option>
                                        <option value={'cotización'}>Cotización</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{width: '100%'}}>
                                <label htmlFor='date'>Ingresar fecha</label>
                                <div className='__wrp_form_control'>
                                    <input type='date' name='date' id='date' placeholder='Ingresar fecha' onChange={(e) => handleChangeInput(e)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='__wrp_form_group'>
                        <label htmlFor='file'>Archivo (Sube archivos .pdf)</label>
                        <div className='__wrp_form_control'>
                            <label className='__span_label' htmlFor='file'>Seleccionar archivo</label>
                            <input type='file' name='file' id='file' style={{display:'none'}} placeholder='Ingresar responsable' accept='.pdf' onChange={(e) => handleChangeFile(e)} />
                        </div>
                    </div>
                </form>

                <div>
                    {isFile && fileType === 'pdf' ? (
                        <object data={isFile} type='application/pdf' width='100%' height='100%' aria-label='Este es un archivo PDF'></object>
                    ) : (
                        <h3>{error}</h3>
                    )}
                </div>

            </div>

            <div className='__modal_foot'>
                <button className='__btn_clos' onClick={() => handleViewModal('', '')}>Cerrar</button>
                <button className='__btn_prim' form='formEdit'>{isLoading ? 'Editando...' : 'Editar'}</button>
            </div>

        </div>
    
    )

}

export default ModalEdit