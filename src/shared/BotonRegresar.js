import React from 'react';
import { Link } from 'react-router-dom';
import './BotonRegresar.css';

const BotonRegresar = () => {
	return (
        <>
            <Link to='/'>
                <button className='btn-regresar'>Volver</button>
            </Link>
        </>
    );
};

export default BotonRegresar;
