import React from 'react'

import './shortcut.css'

function ShortCut({ icon, title, number }) {

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
                <h2>{number}</h2>
            </div>
        </div>
    
    )

}

export default ShortCut