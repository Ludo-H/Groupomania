// Des fonctions réutilisables dans les différents components
import cookie from 'js-cookie';
import Cookies from 'js-cookie';

export const isEmpty = (obj)=> {
    if (obj == null ) return true ;  
}

export const dateParser = (num)=>{
    let options = {hour : "2-digit", minute : '2-digit', year : 'numeric', month : '2-digit', day : '2-digit'};

    let timestamp = Date.parse(num);

    let date = new Date(timestamp).toLocaleDateString('fr-FR', options)

    return date.toString();
}

export const fetchToken = () => {
    const token = Cookies.get().jwt;
    if (!token) {
      window.location.replace("http://localhost:3001/")
    }
  }

export const removeCookie = (key)=>{
    if(window !== "undefined"){
        cookie.remove(key, {expires : 1})
    }
}