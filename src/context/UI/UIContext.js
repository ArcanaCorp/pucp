import React, { createContext, useState } from "react";

const UIContext = createContext();

export const UIProvider = ({ children }) => {

    const [ isMessagesAlert, setIsMessageAlert ] = useState({
        type: '',
        message: ''
    })

    const [ isViewModal, setIsViewModal ] = useState({
        modal: '',
        id: ''
    })

    const handleViewModal = (modal, id) => setIsViewModal({ modal: modal, id: id})

    const handleToogleModal = () => {
        const documentMenu = document.getElementById('root')
        documentMenu.classList.toggle('__xhsy8--active')
    }
    const handleMessageAlert = (type, message) => setIsMessageAlert({ type: type, message: message })

    const contextValue = {
        handleToogleModal,
        isMessagesAlert,
        handleMessageAlert,
        isViewModal,
        handleViewModal
    }

    return (
        <UIContext.Provider value={contextValue}>{children}</UIContext.Provider>
    )

}

export default UIContext;