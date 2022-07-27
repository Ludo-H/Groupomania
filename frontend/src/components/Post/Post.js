import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../Utils';
import LikeButton from './LikeButton';

//props donné pendant le map
const Post = ({ post }) => {

    // Pour montrer a l'user que le post charge
    const [isLoading, setIsLoading] = useState(true)

    // on récupère dans le store redux les infos 
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);

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
                                        })}
                                </h3>
                                <span>{dateParser(post.post_createdat)}</span>
                            </div>
                            <p>{post.post_text}</p>
                            {post.post_photo && <img src={post.post_photo} alt='post' className='post-image' />}
                            <div className="post-right-footer">
                                <div className="post-comment">
                                    <i className="fa-solid fa-comment"></i>
                                    <span>Commenter</span>
                                </div>
                                <LikeButton post={post}/>
                            </div>
                        </div>
                    </Fragment>
                )
            }
        </li>
    );
};

export default Post;