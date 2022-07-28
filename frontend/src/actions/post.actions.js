import axios from 'axios';

// posts
export const GET_POSTS = 'GET_POSTS';
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'

export const getPosts = ()=>{
    return (dispatch)=>{
        return axios
        .get(`${process.env.REACT_APP_API_URL}api/post/`, {withCredentials: true})
        .then((res)=>{
            dispatch({type : GET_POSTS, payload : res.data})
        })
        .catch((error)=> console.log(error))
    }
}

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