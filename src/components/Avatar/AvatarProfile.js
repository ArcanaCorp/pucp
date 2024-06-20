import React, { useContext } from 'react'
import './styles/avatarprofile.css'
import AuthContext from '../../context/Auth/AuthContext'

function AvatarProfile() {

    const { isUser } = useContext(AuthContext)

    return (
    
        <div className='__badge_profile'>
            <div className='__avatar'>
                <img src='https://source.boringavatars.com/beam/120/Stefan?colors=264653,f4a261,e76f51' alt={`Foto de perfil es de ${isUser.name}`} />
            </div>
            <div className='__username'>
                <h3>¡Hola, {isUser.name}!</h3>
            </div>
        </div>
    
    )

}

export default AvatarProfile