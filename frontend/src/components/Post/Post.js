import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../../actions/post.actions';
import { dateParser, isEmpty } from '../Utils';
import Comments from './Comments';
import DeletePost from './DeletePost';
import LikeButton from './LikeButton';

//props donné pendant le map
const Post = ({ post }) => {

    // Pour montrer a l'user que le post charge
    const [isLoading, setIsLoading] = useState(true)

    // Si on clique sur le boutton poue faire l'update
    const [isUpdated, setIsUpdated] = useState(false)
    const [textUpdate, setTextUpdate] = useState(null)

    // pour afficher les comments
    const [showComments, setShowComments] = useState(false);

    // on récupère dans le store redux les infos 
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);

    // import du dispatch pour lancer l'actioon
    const dispatch = useDispatch();

    // declenche la validation de l'update
    const updateItem = ()=>{
        if(textUpdate){
            dispatch(updatePost(post.post_id, textUpdate))
            setIsUpdated(false)
        }
    }

    // il se joue pour l'affichage de posts, variant entrre le loading spinner et l'affichage
    // dépend du reducer avec toutes les infos users
    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false)
    }, [usersData])

    return (
        <li className='post-container'>
            {isLoading ?
                (
                    <i className='fas fa-spinner fa-spin'></i>
                )
                :
                (
                    <Fragment>
                        <div className="post-left">
                            <img
                                src={!isEmpty(usersData[0]) &&
                                    usersData.map((user) => {
                                        if (user.user_id === post.user_id) return user.user_photo;
                                        else return null
                                    }).join('')
                                }
                                alt="user" />
                        </div>
                        <div className="post-right">
                            <div className="post-right-header">
                                <h3>
                                    {!isEmpty(usersData[0]) &&
                                        usersData.map((user) => {
                                            if (user.user_id === post.user_id) return user.user_firstname + ' ' + user.user_lastname;
                                            else return null;
                                        })}
                                </h3>
                                <span>{dateParser(post.post_createdat)}</span>
                            </div>
                            {isUpdated === false && 
                            <p className='post-content'>{post.post_text}</p>}
                            {isUpdated && (
                                <div className="update-post">
                                    <textarea 
                                    defaultValue={post.post_text}
                                    onChange={(e)=> setTextUpdate(e.target.value)}
                                    />
                                    <div className="update-post-button">
                                        <button className='btn' onClick={updateItem}>
                                            Valider modifications
                                        </button>
                                    </div>
                                </div>
                            )}
                            {post.post_photo && <img src={post.post_photo} alt='post' className='post-image' />}
                            {userData.userId === post.user_id && (
                                <div className="button-container">
                                    <div onClick={()=> setIsUpdated(!isUpdated)}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </div>
                                    <DeletePost postId={post.post_id} />
                                </div>
                            )}
                            <div className="post-right-footer">
                                <div className="post-comment" onClick={()=> setShowComments(!showComments)}>
                                    <i className="fa-solid fa-comment"></i>
                                    <span>Commenter</span>
                                </div>
                                <LikeButton post={post}/>
                            </div>
                            {showComments && <Comments post={post} />}
                        </div>
                    </Fragment>
                )
            }
        </li>
    );
};

export default Post;