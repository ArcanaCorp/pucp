import React, { useState } from 'react'

import './createdoc.css'

function CreateDoc() {

    const [ isFile, setIsFile ] = useState(null);
    const [ fileType, setFileType ] = useState('');
    const [ error, setError ] = useState(null);

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

    return (
    
        <div className='__wrap_docs'>

            <div className='__wrp_l'>
                <div className='__wrp_form'>
                    <div className='__wrp_form_group'>
                        <div>
                            <label>Ingresar responsable</label>
                            <div className='__wrp_form_control'>
                                <input type='text' name='response' id='response' placeholder='Ingresar responsable' />
                            </div>
                        </div>
                    </div>
                    <div className='__wrp_form_group'>
                        <div>
                            <label>Institución</label>
                            <div className='__wrp_form_control'>
                                <input type='text' name='response' id='response' placeholder='Ingresar responsable' />
                            </div>
                        </div>
                    </div>
                    <div className='__wrp_form_group'>
                        <div className='__wrp_form_flex'>
                            <div style={{width: '100%'}}>
                                <label>Tipo de documento</label>
                                <div className='__wrp_form_control'>
                                    <input type='text' name='response' id='response' placeholder='Ingresar responsable' />
                                </div>
                            </div>
                            <div style={{width: '100%'}}>
                                <label>Número de documento</label>
                                <div className='__wrp_form_control'>
                                    <input type='text' name='response' id='response' placeholder='Ingresar responsable' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='__wrp_form_group'>
                        <label>Fecha</label>
                        <div className='__wrp_form_control'>
                            <input type='text' name='response' id='response' placeholder='Ingresar responsable' />
                        </div>
                    </div>
                    <div className='__wrp_form_group'>
                        <label>Archivo (Sube archivos .pdf)</label>
                        <div className='__wrp_form_control'>
                            <input type='file' name='response' id='response' placeholder='Ingresar responsable' accept='.pdf' onChange={(e) => handleChangeFile(e)} />
                        </div>
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