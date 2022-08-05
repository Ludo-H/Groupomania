import React from 'react';
import { fetchToken } from '../components/Utils';

const Error = () => {

    fetchToken();

    return (
        <div className='error-page'>
            Page introuvable
        </div>
    );
};

export default Error;