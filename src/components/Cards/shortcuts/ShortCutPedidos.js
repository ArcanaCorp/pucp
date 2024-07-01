import React from 'react'

function ShortCutPedidos({ icon, title }) {
    return (
        <div className='__card_shortcut'>
            <div className='__row_card_shortcut __row_card_shortcut_A'>
                <div className='__ico'>
                    {icon}
                </div>
            </div>
            <div className='__row_card_shortcut __row_card_shortcut_B'>
                <p>{title}</p>
            </div>
            <div className='__row_card_shortcut'>
                <h2>0</h2>
            </div>
        </div>
    )
}

export default ShortCutPedidos