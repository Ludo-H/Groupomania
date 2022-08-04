import React, { Fragment, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, uploadPicture } from '../../actions/user.actions';

const UploadImage = () => {

    const [file, setFile] = useState();
    const [image, setImage] = useState(null)

    const inputRef = useRef()

    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer)

    const handleSubmit = (e) => {
        e.preventDefault();

        if (file) {
            const data = new FormData();
            data.append('user_id', userData.userId);
            data.append('File', file);

            try {
                dispatch(uploadPicture(data, userData.userId))
                    .then(() => dispatch(getUser(userData.userId)))
                    .then(() => {
                        inputRef.current.value = '';
                        setFile('');
                        setImage("");
                    })
            } catch (error) {
                console.log(error);
            }
        }

    }

    const handleImage = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }


    return (
        <form action="" onSubmit={handleSubmit} id='profil-form'>
            <label htmlFor="file-profil">Changer l'image</label>
            <input type="file" id='file-profil' name='file' accept='.jpg, .jpeg, .png' onChange={(e) => handleImage(e)} />
            <br />
            {image &&
                <Fragment>
                    <div className="profil-image">
                        <img src={image} alt='newImage' />
                    </div>
                    <p className='success'>Image sélectionnée</p>
                </Fragment>}
            <br />

            <input ref={inputRef} type="submit" value="Valider" id='send' />
        </form>
    );
};

export default UploadImage;