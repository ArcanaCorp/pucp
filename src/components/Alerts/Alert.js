import React, { useContext, useEffect } from 'react'

import './styles/alert.css'
import UIContext from '../../context/UI/UIContext'

function Alert({ type, message }) {

    const { handleMessageAlert } = useContext(UIContext);

    useEffect(() => {
        setTimeout(() => {
            handleMessageAlert('', '')
        }, 3000)
    }, []);
    
    return (
    
        <div className={`__alert __alert_${type}`}>{message}</div>
    
    )

}

export default Alert