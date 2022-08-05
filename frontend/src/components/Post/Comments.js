import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getComments } from '../../actions/comment.actions';
import { dateParser, isEmpty } from '../Utils';
import EditDeleteComment from './EditDeleteComment';

const Comments = ({ post }) => {

    //********************************************************************/
    // contenu du comment
    const [text, setText] = useState('')
    //********************************************************************/


    //********************************************************************/
    // on récupère dans le store redux les infos 
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const commentsData = useSelector((state) => state.commentReducer);

    // import du dispatch pour lancer l'actioon
    const dispatch = useDispatch();

    // Selection des commentaires propres au post passé en props
    const commDuPost = commentsData.filter((comment) => comment.post_id === post.post_id)
    //********************************************************************/


    //********************************************************************/
    const handleComment = (e) => {
        e.preventDefault();

        if (text) {
            dispatch(addComment(text, post.post_id))
                .then(() => dispatch(getComments()))
                .then(() => setText(''));
        }
    }
    //********************************************************************/


    return (
        <div className="comments-container">
            {commDuPost.map((comment) => {
                console.log(comment.comment_text);
                return (
                    <div
                        key={comment.comment_id}
                        className={comment.user_id === userData.userId ? 'comment-container user' : 'comment-container'}
                    >
                        <div className="left-part">
                            <img
                                src={!isEmpty(usersData[0]) &&
                                    usersData.map((user) => {
                                        if (user.user_id === comment.user_id) return user.user_photo;
                                        else return null
                                    }).join('')
                                }
                                alt="user" />
                        </div>
                        <div className="right-part">
                            <div className="comment-header">
                                <h3>{!isEmpty(usersData[0]) &&
                                    usersData.map((user) => {
                                        if (user.user_id === comment.user_id) return user.user_firstname + ' ' + user.user_lastname;
                                        else return null
                                    }).join('')
                                }</h3>
                                <span>{dateParser(comment.comment_createdat)}</span>
                            </div>
                            <p className='comment-content'>{comment.comment_text}</p>
                            <EditDeleteComment comment={comment} postId={post.post_id} />
                        </div>
                    </div>
                )
            })}
            <form action="" onSubmit={handleComment} className='comment-form'>
                <input
                    type="text"
                    name='text'
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    placeholder='Commentaire...' 
                />
                <br />
                <input type="submit" value="Envoyer" />
            </form>
        </div>
    );
};

export default Comments;