import React, { useContext } from 'react'
import FilterContext from '../../context/Filter/FilterContext'

function Selects({ date, types }) {

    const { handleFilterStatus } = useContext(FilterContext);

    return (
    
        <>
        
            {date && (
                <></>
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

        </>
    
    )

}

export default Selects