import axios from 'axios';

// likes
export const GET_LIKES = 'GET_LIKES';
export const PATCH_LIKE = 'PATCH_LIKE';


export const getLikes = ()=>{
    return async (dispatch)=>{
        return await axios
        .get(`${process.env.REACT_APP_API_URL}api/like/`, {withCredentials: true})
        .then((res)=>{
            dispatch({type : GET_LIKES, payload : res.data})
        })
        .catch((error)=> console.log(error))
    }
}

export const patchLike = (postId, userId)=>{
    return async (dispatch)=>{
        return await axios({
            method : "patch",
            url : `${process.env.REACT_APP_API_URL}api/like/${postId}`,
            data : {postId : postId},
            withCredentials : true
        })
        .then((res)=>{
            dispatch({type : PATCH_LIKE, payload : {postId, userId}})
        })
        .catch((error)=> console.log(error))
    }
}