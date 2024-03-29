import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom';

const HomeProfil = () => {

    // On récupère le contenu de l'user connecté dans son reducer
    const userData = useSelector((state) => state.userReducer);

    return (
        <Fragment>
            <div className="image-profil">
                <img src={userData.photo} alt="user" />
            </div>
            <div className="content-profil">
                <h2>{userData.firstname}</h2>
                {"\u00a0\u00a0"}
                <h2>{userData.lastname}</h2>
            </div>
            <div className="modify-profil">
                <NavLink to='/profil'>
                    <button>Modifier son profil</button>
                </NavLink>
            </div>
        </Fragment>
    );
};

export default HomeProfil;