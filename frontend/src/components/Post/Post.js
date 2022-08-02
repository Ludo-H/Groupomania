import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, updatePost } from '../../actions/post.actions';
import { UserInfosContext } from '../AppContext';
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

    const userInfos = useContext(UserInfosContext) 

    // on récupère dans le store redux les infos 
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);

    // import du dispatch pour lancer l'actioon
    const dispatch = useDispatch();

    // declenche la validation de l'update
    const updateItem = () => {
        if (textUpdate) {
            dispatch(updatePost(post.post_id, textUpdate))
            dispatch(getPosts());
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
                            <div className="post-content">
                                {isUpdated === false &&
                                    <p>{post.post_text}</p>
                                }
                                {post.post_photo && <img src={post.post_photo} alt='post' className='post-image' />}
                                {post.post_video && (
                                    <iframe
                                        width="500"
                                        height="300"
                                        src={post.post_video}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title={post.post_id}
                                    ></iframe>
                                )}
                            </div>
                            {isUpdated && (
                                <div className="update-post">
                                    <textarea
                                        defaultValue={post.post_text}
                                        onChange={(e) => setTextUpdate(e.target.value)}
                                    />
                                        <button className='button send' onClick={updateItem}>
                                            Valider modifications
                                        </button>
                                    
                                </div>
                            )}

                            {(userData.userId === post.user_id || userInfos.admin === 1) && (
                                <div className="button-container">
                                    <div onClick={() => setIsUpdated(!isUpdated)}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </div>
                                    <DeletePost postId={post.post_id} />
                                </div>
                            )}
                            <div className="post-right-footer">
                                <div className="post-comment" onClick={() => setShowComments(!showComments)}>
                                    <i className="fa-solid fa-comment"></i>
                                    <span>Commenter</span>
                                </div>
                                <LikeButton post={post} />
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