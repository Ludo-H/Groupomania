import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {isEmpty} from '../Utils';
import Post from './Post';
import {getPosts} from '../../actions/post.actions'
import { getComments } from '../../actions/comment.actions';
import { getLikes } from '../../actions/like.actions';
import { getUsers } from '../../actions/users.actions';

const HomePost = () => {

    //********************************************************************/
    // pour ne pas rejouer le useEffect, une seule requete
    const [loadPost, setLoadPost] = useState(true);

    // gerer le nombre de posts affichés
    const [countPosts, setCountPosts] = useState(5);
    //********************************************************************/


    //********************************************************************/
    // dispatch permet de lancer une fonction
    const dispatch = useDispatch()

    // on récupère les posts dans redux
    const posts = useSelector((state) => state.postReducer);
    //********************************************************************/


    //********************************************************************/
    // fonction pour afficher plus de posts
    // quuand la quantité de scroll de la page + 1 pixel dépasse le scroll possible du document
    // on repassse le loadPost sur true pour rejouer le useEffect
    const loadMorePosts = ()=>{
        if(window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight){
            setLoadPost(true);
        }
    }
    //********************************************************************/


    //********************************************************************/
    // on joue la fonction une seule fois grace au false
    // le useEffect va se relancer au scroll, changements infos user aussi
    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts(countPosts));
            dispatch(getComments());
            dispatch(getLikes());
            dispatch(getUsers())
            setLoadPost(false)
            setCountPosts(countPosts + 5)
        }

        // pour faire fonctionner un eventListener dans un useEffect, il faut le remove en suivant
        window.addEventListener('scroll', loadMorePosts);
        return ()=>window.removeEventListener('scroll', loadMorePosts);
    }, [loadPost, dispatch, countPosts])
    //********************************************************************/


    // on va maper des li (post) donc on stocke dans une ul
    // isEmpty sécurise la recherche de données, elle ne se fera que si il y a du contenu
    return (
        <Fragment>
            <ul>
                {!isEmpty(posts[0]) &&
                    posts.map((post) => {
                        return (
                            <Post key={post.post_id} post={post} />
                        )
                    })
                }
            </ul>
        </Fragment>
    );
};

export default HomePost;