import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {isEmpty} from '../Utils';
import Post from './Post';
import {getPosts} from '../../actions/post.actions'
import { getComments } from '../../actions/comment.actions';
import { getLikes } from '../../actions/like.actions';

const HomePost = () => {

    // pour ne pas rejouer le useEffect, une seule requete
    const [loadPost, setLoadPost] = useState(true);

    // dispatch permet de lancer une fonction
    const dispatch = useDispatch()

    // on récupère les posts dans redux
    const posts = useSelector((state) => state.postReducer);

    // on joue la fonction une seule fois grace au false
    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts());
            dispatch(getComments());
            dispatch(getLikes());
            setLoadPost(false)
        }
    }, [loadPost, dispatch])


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