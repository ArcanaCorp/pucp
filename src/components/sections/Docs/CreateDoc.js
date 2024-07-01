import React, { useContext, useState } from 'react'
import DBContext from '../../../context/Data/DBContext';

import './createdoc.css'
import { API } from '../../../api/api';
import UIContext from '../../../context/UI/UIContext';

function CreateDoc() {

    const { clients, handleAddDocs } = useContext(DBContext)
    const { handleMessageAlert, handleViewModal } = useContext(UIContext);

    const [ isFile, setIsFile ] = useState(null);
    const [ fileType, setFileType ] = useState('');
    const [ error, setError ] = useState(null);
    const [formData, setFormData] = useState({
        response: '',
        client: '',
        tipodoc: '',
        date: ''
    });
    const [ choosedFile, setChoosedFile ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const fileExtension = file.name.split('.').pop();
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

    const handleSaveDoc = async () => {

        if (!formData.response || !formData.client || !formData.tipodoc || !formData.date || !choosedFile) {
            setError('All fields are required.');
            return;
        }

        setIsLoading(true);

        const data = new FormData();
        data.append('response_document', formData.response);
        data.append('client_document', formData.client);
        data.append('tipo_document', formData.tipodoc);
        data.append('fecha_document', formData.date);
        data.append('file_document', choosedFile);

        try {
            const response = await fetch(`${API.URL}/panel/docs`, {
                method: 'POST',
                body: data,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Error saving document');
            }

            setIsLoading(false);
            handleViewModal('', '')
            setFormData({
                response: '',
                client: '',
                tipodoc: '',
                date: ''
            });
            setIsFile(null);
            setFileType('');
            setError(null);
            handleAddDocs(result.document)
            handleMessageAlert('success', result.message, 'bg')

        } catch (error) {
            console.error('Error saving document:', error.message);
            handleMessageAlert('error', error.message, 'bg')
            setError(error.message);
        }
    };

    return (
    
        <div className='__wrap_docs'>

            <div className='__wrp_l'>
                <div className='__wrp_form'>
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
                    <div className='__wrp_form_group'>
                        <button className='__btn_prim' onClick={handleSaveDoc}>{isLoading ? 'Guardando...' : 'Guardar documento'}</button>
                    </div>
                </div>
            </div>

            <div className='__wrp_r'>
                {isFile && fileType === 'pdf' ? (
                    <object data={isFile} type='application/pdf' width='100%' height='100%' aria-label='Este es un archivo PDF'></object>
                ) : (
                    <h2>{error}</h2>
                )}
            </div>

        </div>
    
    )

}

export default CreateDoc