import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLikes, patchLike } from '../../actions/like.actions';
import { UidContext } from '../AppContext';

const LikeButton = ({ post }) => {


    const uid = useContext(UidContext)

    // le post est il deja liké par l'user
    const [liked, setLiked] = useState(true);

    // pour ne pas rejouer le useEffect, une seule requete 
    // const [loadLike, setLoadLike] = useState(true);

    // const [numberLikes, setNumberLikes] = useState(0)

    // dispatch permet de lancer une fonction
    const dispatch = useDispatch()

    // contenu du reducer like
    const likesData = useSelector((state) => state.likeReducer);


    useEffect(() => {
        dispatch(getLikes());
    }, [dispatch])


    // comportement au click sur le coeur
    const handleLike = () => {

        dispatch(patchLike(post.post_id, uid));

        setTimeout(() => {
            dispatch(getLikes())
        }, 50);

        setTimeout(() => {
            for (let i = 0; i < likesData.length; i++) {
                if (likesData[i].post_id === post.post_id ) {
                    console.log('coucou');
                    setLiked(true)
                } else {
                    console.log('coucou2');
                    setLiked(false)
                }
            } 
        }, 1000);
        
        

        // if (likesData) {
        //     // setNumberLikes(numberLikes - 1)
        //     setLiked(false)
        // } else {
        //     // setNumberLikes(numberLikes + 1)
        //     setLiked(true)
        // }        
    }


    // const la = useEffect(() => {

    //     const likesReview = () => {
    //         for (let i = 0; i < likesData.length; i++) {
    //             if (likesData[i].post_id === post.post_id && likesData[i].user_id === uid) {
    //                 return <i
    //                     className="fa-solid fa-heart success"
    //                     onClick={handleLike}
    //                 ></i>

    //             } else {
    //                 return <i
    //                     className="fa-solid fa-heart"
    //                     onClick={handleLike}
    //                 ></i>
    //             }
    //         }

    //     }

    //     likesReview()
    // }, [likesData])


    return (
        <div className='like-container'>

            <i
                className={liked ? "fa-solid fa-heart success" : "fa-solid fa-heart"}
                onClick={handleLike}
            ></i>
            {/* <p>{numberLikes}</p> */}
        </div>
    );
};

export default LikeButton;