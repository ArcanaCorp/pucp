import React, { useContext, useEffect } from 'react'

import './styles/alert.css'
import UIContext from '../../context/UI/UIContext'

function Alert({ type, message, bg }) {

    const { handleMessageAlert } = useContext(UIContext);

    useEffect(() => {
        setTimeout(() => {
            handleMessageAlert('', '')
        }, 3000)
    }, [handleMessageAlert]);
    
    return (
    
        <div className={`__alert ${bg !== '' ? `__alert_bg_${type}` : `__alert_${type}`}`}>{message}</div>
    
    )

}

export default Alert