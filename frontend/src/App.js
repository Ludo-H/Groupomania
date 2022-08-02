import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions';
import { UserInfosContext } from './components/AppContext';

// toutes les routes
import Routes from "./components/Routes/index";

function App() {

  // On récupére la valeur userId du cookie (token) pour le faire passer a dautrre comp
  const [infosUser, setInfosUser] = useState({
    userId : null,
    admin : null
  })

  // hook qui permet d'envoyer l'info avec la fonction de action
  // dispatch c'est pour déclencher une fonction
  const dispatch = useDispatch()

  // jwt decode permet de vérifier le contenu du token récupéré
  useEffect(() => {
    const fetchToken = () => {
      const token = Cookies.get().jwt;
      if (token) {
        const decoded = jwt_decode(token);
        setInfosUser({userId : decoded.userId, admin : decoded.admin});
      } else {
        console.log("no token");
      }
    }
    fetchToken();


    if (infosUser.userId) dispatch(getUser(infosUser.userId))
  }, [infosUser.userId ,dispatch])
  

  return (
    <UserInfosContext.Provider value={infosUser}>
      <Routes />
    </UserInfosContext.Provider>
  );
}

export default App;
