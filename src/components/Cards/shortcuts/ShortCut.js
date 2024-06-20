import React from 'react'

import './shortcut.css'

function ShortCut({ shortcut }) {

    return (
    
        <div className='__card_shortcut'>
            <div className='__row_card_shortcut __row_card_shortcut_A'>
                <div className='__ico'>
                    {shortcut.icon}
                </div>
            </div>
            <div className='__row_card_shortcut __row_card_shortcut_B'>
                <p>{shortcut.title}</p>
            </div>
            <div className='__row_card_shortcut'>
                <h2>{shortcut.number}</h2>
            </div>
        </div>
    
    )

}

export default ShortCut