import axios from 'axios';

export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';


//********************************************************************/
export const getComments = ()=>{
    return (dispatch)=>{
        return axios
        .get(`${process.env.REACT_APP_API_URL}api/comment/`, {withCredentials: true})
        .then((res)=>{
            dispatch({type : GET_COMMENTS, payload : res.data})
        })
        .catch((error)=> console.log(error))
    }
}
//********************************************************************/


//********************************************************************/
export const addComment = (text, postId)=>{
    return (dispatch)=>{
        return axios({
            method : 'post',
            url : `${process.env.REACT_APP_API_URL}api/comment/`,
            withCredentials : true,
            data : {text : text, postId : postId}
        })
        .then((res)=>{
            dispatch({type : ADD_COMMENT, payload : {postId}})
        })
        .catch((error)=> console.log(error))
    }
}
//********************************************************************/


//********************************************************************/
export const editComment = (text, commentId)=>{
    return (dispatch)=>{
        return axios({
            method : 'put',
            url : `${process.env.REACT_APP_API_URL}api/comment/${commentId}`,
            withCredentials : true,
            data : {text : text}
        })
        .then((res)=>{
            dispatch({type : EDIT_COMMENT, payload : {commentId, text}})
        })
        .catch((error)=> console.log(error))
    }
}
//********************************************************************/


//********************************************************************/
export const deleteComment = (commentId)=>{
    return (dispatch)=>{
        return axios({
            method : 'delete',
            url : `${process.env.REACT_APP_API_URL}api/comment/${commentId}`,
            withCredentials : true
        })
        .then((res)=>{
            dispatch({type : DELETE_COMMENT, payload : {commentId}})
        })
        .catch((error)=> console.log(error))
    }
}
//********************************************************************/