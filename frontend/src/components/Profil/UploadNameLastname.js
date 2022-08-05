import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, uploadNameLastname } from '../../actions/user.actions';

const UploadNameLastname = () => {

  //********************************************************************/
  const [inputDisplay, setInputDisplay] = useState(false)
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  //********************************************************************/


  //********************************************************************/
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  //********************************************************************/


  //********************************************************************/
  const handleSubmit = () => {

    if (lastname && firstname) {
      // const data = new FormData();
      // data.append('firstname', firstname);
      // data.append('lastname', lastname);

      const data = { firstname: firstname, lastname: lastname }

      try {
        dispatch(uploadNameLastname(data, userData.userId))
          .then(() => dispatch(getUser(userData.userId)))
          .then(() => {
            setFirstName('')
            setLastName('')
          })
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Veuillez renseigner nom et prénom")
    }
  }
  //********************************************************************/


  return (
    <div className="modify-infos">
      <button
        className='modify'
        onClick={() => setInputDisplay(!inputDisplay)}
      >
        Modifier Nom et Prénom
      </button>
      {inputDisplay &&
        <Fragment>
          <label htmlFor="profil-firstname">Prénom</label>
          <input
            type="text"
            name="firstname"
            id="profil-firstname"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label htmlFor="profil-lastname">Nom</label>
          <input
            type="text"
            name="lastname"
            id="profil-lastname"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />

          <button className='send' onClick={handleSubmit}>Valider</button>
        </Fragment>
      }
    </div>
  );
};

export default UploadNameLastname;