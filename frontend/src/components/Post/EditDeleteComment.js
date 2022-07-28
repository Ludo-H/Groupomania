import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment, editComment } from '../../actions/comment.actions';
import { UidContext } from '../AppContext';

const EditDeleteComment = ({ comment, postId }) => {

    // on verifie si l'user est l'auter du post
    const [isAuthor, setIsAuthor] = useState(false)

    // est ce que l'user est en train de modifer
    const [edit, setEdit] = useState(false)

    // le contenu de la modification
    const [text, setText] = useState('')

    // userId créé plus haut dans app
    const uid = useContext(UidContext);

    // import du dispatch pour lancer l'actioon
    const dispatch = useDispatch();

    // fonction d'edition
    const handleEdit = (e) => {
        e.preventDefault();
        if (text) {
            dispatch(editComment(text, comment.comment_id))
            setText('')
            setEdit(false)
        }
    }


    // suppression du comm
    const handleDelete = () => {
        dispatch(deleteComment(comment.comment_id));
    }

    useEffect(() => {
        const checkAuthor = () => {
            if (uid === comment.user_id) {
                setIsAuthor(true)
            }
        }
        checkAuthor();
    }, [uid, comment.user_id])



    return (
        <div className="edit-comment">
            {isAuthor && edit === false && (
                <span onClick={() => setEdit(!edit)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </span>
            )}
            {isAuthor && edit && (
                <form action="" onSubmit={handleEdit} className='edit-comment-form'>
                    <label htmlFor="text" onClick={() => setEdit(!edit)}>Editer</label>
                    <br />
                    <input type="text" name='text' onChange={(e) => setText(e.target.value)} defaultValue={comment.comment_text} />
                    <br />
                    <div onClick={() => {
                        if (window.confirm('Voulez-vous supprimer ce commentaire ?')) {
                            handleDelete()
                        }
                    }}>
                        <i className="fa-solid fa-trash-can"></i>
                    </div>
                    <input type="submit" value="Valider modifications" />
                </form>
            )}
        </div>
    );
};

export default EditDeleteComment;