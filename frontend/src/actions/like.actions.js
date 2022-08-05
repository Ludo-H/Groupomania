import axios from 'axios';

export const GET_LIKES = 'GET_LIKES';
export const LIKE_POST = 'LIKE_POST';


//********************************************************************/
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
//********************************************************************/


//********************************************************************/
export const likePost = (postId, userId)=>{
    return async (dispatch)=>{
        return await axios({
            method : 'post',
            url : `${process.env.REACT_APP_API_URL}api/like/${postId}`,
            withCredentials : true
        })
        .then((res)=>{
            console.log(res);
            dispatch({type : LIKE_POST, payload : {postId, userId}})
        })
        .catch((error)=> console.log(error))
    }
}
//********************************************************************/