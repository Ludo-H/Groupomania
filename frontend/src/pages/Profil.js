import React, { Fragment} from 'react';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import {useDispatch, useSelector } from 'react-redux';
import UploadImage from '../components/Profil/UploadImage';
import UploadNameLastname from '../components/Profil/UploadNameLastname';
import { deleteAccount } from '../actions/user.actions';
import cookie from 'js-cookie';

const Profil = () => {

  const fetchToken = () => {
    const token = Cookies.get().jwt;
    if (!token) {
      window.location.replace("http://localhost:3001/")
    }
  }
  fetchToken();

  const removeCookie = (key)=>{
    if(window !== "undefined"){
        cookie.remove(key, {expires : 1})
    }
}

  const userData = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  const handleDelete = ()=>{
    if(window.confirm('Voulez-vous vraiment supprimer votre compte ?')){
      dispatch(deleteAccount(userData.userId))
      .then(()=>removeCookie('jwt'))
      .then(()=> window.location = '/')
    }
  }

  return (
    <Fragment>
      <Header />
      <div className="profil-container">
        <div className="profil-modal">
          <div className="infos-user">
            <h3>{userData.lastname} {userData.firstname}</h3>
            <div className="profil-image">
              <img src={userData.photo} alt="user" />
            </div>
              <UploadImage />
          </div>
          <UploadNameLastname/>
          <div className="delete-account">
            <button onClick={handleDelete}>Supprimer le compte</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profil;