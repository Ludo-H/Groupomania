// regroupe toutes les actions liées aux données user

import axios from "axios";

// table des matieres des actions
// on déclare dabord le nom de l'action
export const GET_USER = 'GET_USER';
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPLOAD_NAME_LASTNAME = "UPLOAD_NAME_LASTNAME";
export const DELETE_ACCOUNT = "DELETE_ACCOUNT";


// puis chaque action aura sa fonction
// dispatch représente ce qui va partir au reducer

//********************************************************************/
export const getUser = (userId) =>{
    return async (dispatch)=>{
        return await axios
        .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`, {withCredentials: true})
        .then((res)=>{
            // on retrouve le dispatch ici
            // reprenant la const voulue et le payload représentant la data envoyé
            dispatch({type : GET_USER, payload : res.data})
        })
        .catch((error)=> console.log(error))
    }
}
//********************************************************************/


//********************************************************************/
export const uploadPicture = (data, userId)=>{
    return (dispatch)=>{
        return axios({
            method : 'patch',
            url : `${process.env.REACT_APP_API_URL}api/user/image/${userId}`,
            withCredentials : true,
            data : data
        })
        .then((res)=>{
            dispatch({type : UPLOAD_PICTURE , payload : res.data})
        })
        .catch((error)=> console.log(error))
    }
}
//********************************************************************/


//********************************************************************/
export const uploadNameLastname = (data, userId)=>{
    return async(dispatch)=>{
        return await axios({
            method : 'patch',
            url : `${process.env.REACT_APP_API_URL}api/user/${userId}`,
            withCredentials : true,
            data : data
        })
        .then((res)=>{
            dispatch({type : UPLOAD_NAME_LASTNAME , payload : res.data})
        })
        .catch((error)=> console.log(error))
    }
}
//********************************************************************/


//********************************************************************/
export const deleteAccount = (userId) =>{
    return async (dispatch)=>{
        return await axios
        .delete(`${process.env.REACT_APP_API_URL}api/user/delete/${userId}`, {withCredentials: true})
        .then((res)=>{
            // on retrouve le dispatch ici
            // reprenant la const voulue et le payload représentant la data envoyé
            dispatch({type : DELETE_ACCOUNT, payload : res.data})
        })
        .catch((error)=> console.log(error))
    }
}
//********************************************************************/