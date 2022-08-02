import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLikes } from '../../actions/like.actions';
import { getPosts, likePost, postIsLiked } from '../../actions/post.actions';
import { UserInfosContext } from '../AppContext';

const LikeButton = ({ post }) => {


    const infosUser = useContext(UserInfosContext)

    // le post est il deja liké par l'user
    const [liked, setLiked] = useState(false);

    // dispatch permet de lancer une fonction
    const dispatch = useDispatch()

    // On récupère les données du reducer
    const likeData = useSelector((state)=> state.likeReducer)

    // on isole les likes du post
    const likesDuPost = likeData.filter((like) => like.post_id === post.post_id)

    // on isole le like s'il existe, de l'user connecté avec le post
    const userLikeThePost = likesDuPost.filter((like)=> like.user_id === infosUser.userId && like.post_id === post.post_id)

    const handleLike = ()=>{
        try {
            dispatch(likePost(post.post_id, infosUser.userId))
            .then(()=> dispatch(postIsLiked(post.post_id)))
            .then(()=> setLiked(!liked))
            .then(()=> dispatch(getPosts()))
            .then(()=> dispatch(getLikes()))

            
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='like-container'>
            <i
                className={userLikeThePost.length === 0 ? 'fa-solid fa-heart empty' : 'fa-solid fa-heart heart'}
                onClick={handleLike}
            ></i>
            <p>{post.post_likes}</p>
        </div>
    );
};

export default LikeButton;