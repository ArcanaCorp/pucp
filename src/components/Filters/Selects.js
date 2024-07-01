import React, { useContext } from 'react'
import FilterContext from '../../context/Filter/FilterContext'
import moment from 'moment';

function Selects({ date, types, sales, docs }) {

    const { handleFilters } = useContext(FilterContext);

    const months = moment.months().map((month, index) => ({
        name: month,
        value: index + 1, // Los meses en Moment.js son base 0, sumamos 1 para base 1
    }));

    const currentYear = moment().year();
    const years = Array.from({ length: 7 }, (v, i) => currentYear - i);

    return (
    
        <>
        
            <div style={{display: 'flex', gap: '2rem'}}>

                {date && (
                    <>
                        <select className='__select'>
                            <option defaultValue={''}>Filtrar por mes</option>
                            {months.map((month) => (
                                <option key={month.value} value={month.value}>{month.name}</option>
                            ))}
                        </select>
                        <select className='__select'>
                            <option defaultValue={''}>Filtrar por año</option>
                            {years.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </>
                )}

                {types && (
                    <>
                        <select className={`__select`} name='selectType' id='selectType' onChange={(e) => handleFilters(e.target.value)}>
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
                        <select className={`__select`} name='selectType' id='selectType' onChange={(e) => handleFilters(e.target.value)}>
                            <option defaultValue={''}>Filtrar por transacción</option>
                            <option value={'0'}>Compra</option>
                            <option value={'1'}>Venta</option>
                        </select>
                    </>
                )}
            
                {docs && (
                    <>
                        <select className={`__select`} name='selectType' id='selectType' onChange={(e) => handleFilters('doc', e.target.value, 'tipo')}>
                            <option defaultValue={''}>Filtrar por documento</option>
                            <option value={'compra'}>Compra</option>
                            <option value={'venta'}>Venta</option>
                            <option value={'pedido'}>Pedido</option>
                            <option value={'cotizacion'}>Cotización</option>
                        </select>
                    </>
                )}

            </div>

        </>
    
    )

}

export default Selects