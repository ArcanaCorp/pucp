import React, { useContext } from 'react'
import FilterContext from '../../context/Filter/FilterContext'

function Selects({ date, types, sales, docs }) {

    const { handleFilterStatus } = useContext(FilterContext);

    return (
    
        <>
        
            {date && (
                <><input type='date' className='__select' /></>
            )}

            {types && (
                <>
                    <select className={`__select`} name='selectType' id='selectType' onChange={(e) => handleFilterStatus(e.target.value)}>
                        <option defaultValue={''}>Filtrar por estado</option>
                        <option value={'0'}>Pendiente</option>
                        <option value={'1'}>Proceso</option>
                        <option value={'2'}>Finalizado</option>
                        <option value={'3'}>Entregado</option>
                    </select>
                </>
            )}

            {sales && (
                <>
                    <select className={`__select`} name='selectType' id='selectType' onChange={(e) => handleFilterStatus(e.target.value)}>
                        <option defaultValue={''}>Filtrar por transacción</option>
                        <option value={'0'}>Compra</option>
                        <option value={'1'}>Venta</option>
                    </select>
                </>
            )}

            {docs && (
                <>
                    <select className={`__select`} name='selectType' id='selectType' onChange={(e) => handleFilterStatus(e.target.value)}>
                        <option defaultValue={''}>Filtrar por documento</option>
                        <option value={'0'}>Compra</option>
                        <option value={'1'}>Venta</option>
                        <option value={'0'}>Pedido</option>
                        <option value={'1'}>Cotización</option>
                    </select>
                </>
            )}

        </>
    
    )

}

export default Selects