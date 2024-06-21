import React from 'react'

import './factura.css'

function Factura({ data }) {

    return (
    
        <div className='__table_facture'>

            <div className='__table_facture_head'>
                <div className='__col_facture'><span>Pedido</span></div>
                <div className='__col_facture'><span>Cantidad</span></div>
                <div className='__col_facture'><span>Precio U.</span></div>
                <div className='__col_facture'><span>Precio T.</span></div>
            </div>

            <div className='__table_facture_body'>
                {data.details.map((details, index) => (
                    <div className='__row_facture_list' style={{borderBottom: '1px solid #ccc'}} key={index}>
                        <div className='__col_facture_item' style={{paddingLeft: '2rem'}}><span>{details.product}</span></div>
                        <div className='__col_facture_item __col_facture_item_value'><span>{details.amount}</span></div>
                        <div className='__col_facture_item __col_facture_item_value'><span>s/. {details.precio_u}</span></div>
                        <div className='__col_facture_item __col_facture_item_value'><span>s/. {(details.amount) * (details.precio_u)}</span></div>
                    </div>
                ))}
                <div className='__row_facture'>
                    <div className='__col_facture __col_facture_title'><span>Incluye:</span></div>
                </div>
                {data.details[0].product_details.map((subdetails, insub) => (
                    <div className='__row_facture_list' key={insub}>
                        <div className='__col_facture_item __col_facture_item_xb' style={{paddingLeft: '5rem'}}><span>{subdetails.component}</span></div>
                        <div className='__col_facture_item __col_facture_item_value __col_facture_item_xb'><span></span></div>
                        <div className='__col_facture_item __col_facture_item_value __col_facture_item_xb'><span>s/. {subdetails.precio_u}</span></div>
                        <div className='__col_facture_item __col_facture_item_value __col_facture_item_xb'><span>s/. {subdetails.precio_total}</span></div>
                    </div>
                ))}
                <div className='__row_facture'>
                    <div className='__col_facture __col_facture_title' style={{borderRight: '1px solid #ccc'}}><span>Envío del pedido</span></div>
                    <div className='__col_facture __col_facture_title' style={{width: '180px'}}><span>s/. {data.precio_envio}</span></div>
                </div>
                <div className='__row_facture'>
                    <div className='__col_facture __col_facture_title' style={{borderRight: '1px solid #ccc', justifyContent: 'flex-end'}}><span>Subtotal</span></div>
                    <div className='__col_facture __col_facture_title' style={{width: '180px'}}><span>s/. {data.subtotal}</span></div>
                </div>
                <div className='__row_facture'>
                    <div className='__col_facture __col_facture_title' style={{borderRight: '1px solid #ccc', justifyContent: 'flex-end'}}><span>Impuesto</span></div>
                    <div className='__col_facture __col_facture_title' style={{width: '180px'}}><span>s/. {data.impuesto}</span></div>
                </div>
                <div className='__row_facture'>
                    <div className='__col_facture __col_facture_title' style={{borderRight: '1px solid #ccc', justifyContent: 'flex-end'}}><span>Total</span></div>
                    <div className='__col_facture __col_facture_title' style={{width: '180px', padding: '0px', justifyContent: 'center'}}><span>s/. {data.price}</span></div>
                </div>
            </div>

        </div>
    
    )

}

export default Factura