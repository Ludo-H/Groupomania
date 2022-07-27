import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLikes, patchLike } from '../../actions/like.actions';
import { UidContext } from '../AppContext';

const LikeButton = ({ post }) => {

    const uid = useContext(UidContext)

    // le post est il deja liké par l'user
    const [liked, setLiked] = useState(false);

    // pour ne pas rejouer le useEffect, une seule requete
    const [loadLike, setLoadLike] = useState(true);

    const [numberLikes, setNumberLikes] = useState(0)

    // dispatch permet de lancer une fonction
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (loadLike) {
            dispatch(getLikes());
            setLoadLike(false)
        }
        
    }, [loadLike])
    


    // contenu du reducer like
    const likesData = useSelector((state) => state.likeReducer);

    // comportement au click sur le coeur
    const handleLike = () => {
        dispatch(patchLike(post.post_id, uid));
        dispatch(getLikes())
        // if (liked) {
        //     setNumberLikes(numberLikes - 1)
        //     setLiked(false)
        // } else {
        //     setNumberLikes(numberLikes + 1)
        //     setLiked(true)
        // }
    }

    // on joue la fonction une seule fois grace au false
    useEffect(() => {
        
        // const likesNumber = () => {
        //     for (let i = 0; i < likesData.length; i++) {
              
        //         if (likesData[i].post_id === post.post_id) {
        //             setNumberLikes(numberLikes + 1)
        //         }
        //     }
        //     likesNumber()
        // }
        setNumberLikes(likesData.length)
        

    }, [likesData, dispatch])




    // useEffect(() => {
    //     if(numberLikes === 0){
    //         let number = 0;
    //         const likesNumber = () => {
    //             for (let i = 0; i < likesData.length; i++) {
    //                 if (likesData[i].post_id === post.post_id) {
    //                     number++;
    //                     setNumberLikes(number)
    //                 }
    //             }

    //         }
    //         likesNumber();
    //     }else{
    //         let number = numberLikes;
    //         const likesNumber = () => {
    //             for (let i = 0; i < likesData.length; i++) {
    //                 if (likesData[i].post_id === post.post_id) {
    //                     number++;
    //                     setNumberLikes(number)
    //                 }
    //             }
    //         }
    //         likesNumber();
    //     }

    // }, [likesData, post.post_id])



    // Logique pour récupérer le nombre de likes du post
    // let number = 0;
    // const likesNumber = () => {
    //     for (let i = 0; i < likesData.length; i++) {
    //         if (likesData[i].post_id === post.post_id) {
    //             number++;
    //         }
    //     }
    // }
    // likesNumber();




    return (
        <div className='like-container'>
            <i
                className="fa-solid fa-heart"
                onClick={handleLike}
            ></i>
            <p>{numberLikes}</p>
        </div>
    );
};

export default LikeButton;