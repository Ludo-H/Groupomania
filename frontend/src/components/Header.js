import React from 'react';
import {NavLink} from 'react-router-dom';
import Logout from './Log/Logout';

const Header = () => {
    return (
        <div className='nav-header'>
            <div className='nav-header-left'>
                <NavLink to='/home'>
                    <img src="./images/logo-g.png" alt="logo groupomania" />
                </NavLink>
            </div>
            <div className='nav-header-right'>
                <Logout/>
            </div>
        </div>
    );
};

export default Header;