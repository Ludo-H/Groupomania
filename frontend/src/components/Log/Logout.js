import React, { Fragment } from 'react';
import axios from 'axios';
import { removeCookie } from '../Utils';


const Logout = () => {

    //********************************************************************/
    // fonction qui atttend le axios, et utilise la supprssion cookie
    // window loction permet d'actualiser la navbar sinon elle ne change pas
    const logout = async ()=>{
        await axios({
            method : 'get',
            url : `${process.env.REACT_APP_API_URL}api/user/logout`,
            withCredentials : true
        })
        .then(() => removeCookie('jwt'))
        .catch((error)=> console.log(error))

        window.location = '/';
    }
    //********************************************************************/


    return (
        <Fragment>
            <i 
            className="fa-solid fa-right-from-bracket"
            onClick={()=>logout()}
            >
            </i>
        </Fragment>
    );
};

export default Logout;