import axios from 'axios';

export const GET_LIKES = 'GET_LIKES';

export const getLikes = ()=>{
    return async (dispatch)=>{
        return await axios
        .get(`${process.env.REACT_APP_API_URL}api/like/`, {withCredentials: true})
        .then((res)=>{
            console.log(res.data);
            dispatch({type : GET_LIKES, payload : res.data})
        })
        .catch((error)=> console.log(error))
    }
}