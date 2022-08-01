import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addPost, getPosts } from '../../actions/post.actions';
import { dateParser, isEmpty } from '../Utils';

const NewPost = () => {

    // chargement du component
    const [isLoading, setIsLoading] = useState(true);

    // contenu du message
    const [text, setText] = useState("");
    const [image, setImage] = useState(null)
    const [file, setFile] = useState()

    // a voir si ça marche
    const [video, setVideo] = useState('')

    // pour pouvoir vider le contenu de l'input à l'annulation du post
    const inputRef = useRef();

    const userData = useSelector((state) => state.userReducer);

    const dispatch = useDispatch();



    // on va créé le contenu à envoyer au back dans une variable, qu'on passera a la fonction axios
    const handlePost = async () => {

        if (text || image || video) {
            const data = new FormData();
            data.append('user_id', userData.userId);
            data.append('text', text); // req.body.text dans postcontroller
            if (file) data.append('File', file); // File defini dans multer
            if (video) data.append('video', video);



            await dispatch(addPost(data))
                .then(() => dispatch(getPosts()))
                .then(() => cancelPost())


        } else {
            alert('Veuillez créer un post')
        }
    }

    // image est l'affichage en front, file est le fichier non visuel a envoyé dans BDD
    // la fonction permet d'inclure l'url choisi
    const handleImage = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
        setVideo('')
    }



    // pour annuler le contenu ecrit
    const cancelPost = () => {
        setText("");
        setImage("");
        setVideo("");
        setFile('');
        inputRef.current.value = '';
        dispatch(getPosts());
    }

    // la fonction va analyser le contenu du post en séparant par chaque espace
    // puis on analyse toutes ces sections
    // si on trouve un des deux cas énoncés, on remplace une partie du lien (car on ne pourrait pas voir la video sinon) par embed.
    // on enleve ensuite le temps ou on en est dans la video (exemple &t=87s) voir un lien youtube, on garde la partie de gauche
    const handleVideo = () => {
        let findVideoLink = text.split(' ');
        for (let i = 0; i < findVideoLink.length; i++) {
            if (findVideoLink[i].includes('https://www.yout') || findVideoLink[i].includes('https://yout')) {
                let embed = findVideoLink[i].replace('watch?v=', 'embed/');
                setVideo(embed.split('&')[0])
                findVideoLink.splice(i, 1)
                setText(findVideoLink.join(' '))
                setImage('');
            }
        }
    }

    useEffect(() => {
        // si userData n'est pas vide
        if (!isEmpty(userData)) {
            setIsLoading(false)
        }
        handleVideo();
    }, [userData, text, video])



    return (
        <div className='newPost-container'>
            {isLoading ? (
                <i className='fas fa-spinner fa-pulse'></i>
            )
                :
                (
                    <Fragment>

                        <div className="user-image">
                            <NavLink to='/profil' >
                                <img src={userData.photo} alt="user" />
                            </NavLink>
                        </div>

                        <div className="newPost-form">
                            <textarea
                                name='text'
                                id='text'
                                placeholder="Ecrire un post"
                                onChange={(e) => setText(e.target.value)}
                                value={text}
                            />
                            {text || image || video.length > 20 ? (
                                <li className='futurePost-container'>
                                    <div className="futurePost-left">
                                        <img src={userData.photo} alt="user" />
                                    </div>
                                    <div className="futurePost-right">
                                        <div className="futurePost-header">
                                            <h3>{userData.firstname + ' ' + userData.lastname}</h3>
                                            <span>{dateParser(new Date((Date.now())))}</span>
                                        </div>

                                        <div className="futurePost-content">
                                            <p>{text}</p>
                                            <img src={image} alt="" />
                                            {video && (
                                                <iframe
                                                    src={video}
                                                    frameBorder='0'
                                                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                                    allowFullScreen
                                                    title={video}
                                                >
                                                </iframe>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            ) : null}
                            <div className="futurePost-footer">
                                <div className="image-icon">
                                    {/* <i className="fa-solid fa-image"></i>
                                    <input 
                                    type="file" 
                                    id='file-newPost' 
                                    name='file' 
                                    accept='.jpg, .jpeg, .png' 
                                    onChange={(e) => handleImage(e)} /> */}
                                    {video === '' &&
                                        (
                                            <Fragment>
                                                <i className="fa-solid fa-image"></i>
                                                <input ref={inputRef} type="file" id='file-newPost' name='file' accept='.jpg, .jpeg, .png' onChange={(e) => handleImage(e)} />
                                            </Fragment>
                                        )
                                    }

                                    {video && (
                                        <div className="delete-video">
                                            <button onClick={() => setVideo("")}>Supprimer video</button>
                                        </div>
                                    )}
                                </div>
                                <div className="btn-send">
                                    {text || image || video.length > 20 ? (
                                        <button className="cancel" onClick={cancelPost}>X</button>
                                    )
                                        :
                                        null
                                    }
                                    <button className='send' onClick={handlePost}><i className="fa-solid fa-paper-plane"></i></button>
                                </div>
                            </div>
                        </div>

                    </Fragment>
                )}
        </div>
    );
};

export default NewPost;