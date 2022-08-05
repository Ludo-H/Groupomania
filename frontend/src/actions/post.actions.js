import axios from 'axios';

export const GET_POSTS = 'GET_POSTS';
export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const POST_IS_LIKED = 'POST_IS_LIKED';


//********************************************************************/
export const getPosts = (num)=>{
    return (dispatch)=>{
        return axios
        .get(`${process.env.REACT_APP_API_URL}api/post/`, {withCredentials: true})
        .then((res)=>{
            console.log(res.data);
            const array = res.data.slice(0, num)
            dispatch({type : GET_POSTS, payload : array})
        })
        .catch((error)=> console.log(error))
    }
}
//********************************************************************/


//********************************************************************/
export const addPost = (data)=>{
    return (dispatch)=>{
        return axios({
        method : 'post',
        url : `${process.env.REACT_APP_API_URL}api/post/`,
        withCredentials : true,
        data : data
        })
        .then((res)=>{
            console.log(res);
            dispatch({type : ADD_POST, payload : res.data})
        })
        .catch((error)=> console.log(error))
    }
}
//********************************************************************/


//********************************************************************/
export const updatePost = (postId, text)=>{
    return (dispatch)=>{
        return axios({
            method : 'put',
            url : `${process.env.REACT_APP_API_URL}api/post/${postId}`,
            data : {text : text},
            withCredentials : true
        })
        .then((res)=>{
            dispatch({type : UPDATE_POST, payload : {text, postId}})
        })
        .catch((error)=> console.log(error))
    }
}
//********************************************************************/


//********************************************************************/
export const deletePost = (postId)=>{
    return (dispatch)=>{
        return axios({
            method : 'delete',
            url : `${process.env.REACT_APP_API_URL}api/post/${postId}`,
            withCredentials : true
        })
        .then((res)=>{
            dispatch({type : DELETE_POST, payload : {postId}})
        })
        .catch((error)=> console.log(error))
    }
}
//********************************************************************/


//********************************************************************/
export const postIsLiked = (postId)=>{
    return async (dispatch)=>{
        return await axios
        .get(`${process.env.REACT_APP_API_URL}api/like/${postId}`, {withCredentials: true})
        .then((res)=>{
            const message = res.data.message;
            dispatch({type : POST_IS_LIKED, payload : {message, postId}})
        })
        .catch((error)=> console.log(error))
    }
}
//********************************************************************/