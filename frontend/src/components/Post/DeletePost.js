import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/post.actions';

const DeletePost = (props) => {

    const dispatch = useDispatch();

    const deleteThePost = ()=>{
        dispatch(deletePost(props.postId));
    }

    return (
        <div onClick={()=>{
            if(window.confirm('Voulez-vous supprimer ce post ?')){
                deleteThePost()
            }
        }}>
            <i className="fa-solid fa-trash-can"></i>
        </div>
    );
};

export default DeletePost;