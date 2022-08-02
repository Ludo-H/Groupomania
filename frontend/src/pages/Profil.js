import React from 'react';
import Cookies from 'js-cookie';
import Header from '../components/Header';

const Profil = () => {

    const fetchToken = () => {
        const token = Cookies.get().jwt;
        if (!token) {
          window.location.replace("http://localhost:3001/")
        }
      }
      fetchToken();

    return (
        <div>
            <Header/>
            profil
        </div>
    );
};

export default Profil;