import axios from 'axios';
import React, { Fragment, useState } from 'react';
import LogIn from './LogIn';

const SignUp = () => {

    //********************************************************************/
    // quand inscription validée, on passe en true pour afficher le reste
    const [formSubmit, setFormSubmit] = useState(false);

    // tous les contenus inputs
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    //********************************************************************/


    //********************************************************************/
    // selection des div errors
    const nameError = document.querySelector('.name-error.error');
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(".password-confirm.error");
    //********************************************************************/

    
    //********************************************************************/
    // logique d'inscription
    const handleRegister = (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            passwordConfirmError.innerHTML = 'Les mots de passes ne correspondent pas';
            passwordError.innerHTML = "";
            nameError.innerHTML = '';
        
        } else if(firstName === "" || lastName === ""){
            nameError.innerHTML = 'Veuillez rentrer un nom et prénom';
            passwordError.innerHTML = "";
            passwordConfirmError.innerHTML = "";
            emailError.innerHTML = "";
            
        } else {
            passwordConfirmError.innerHTML = "";
            axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}api/user/signup`,
                data: {
                    email: email,
                    password: password,
                    firstname: firstName,
                    lastname: lastName
                },
                withCredentials: true
            })
                .then((res) => {
                    console.log(res);
                    if (res.data.message === "Email déjà créé") {
                        emailError.innerHTML = res.data.message;
                        passwordError.innerHTML = "";
                        
                       
                    } else if (res.data.error === "Cet email n'est pas valide") {
                        emailError.innerHTML = res.data.error;
                        passwordError.innerHTML = "";
                        
                       
                    } else if (res.data.error === 'Le mot de passe doit contenir 8 caractères minimum, une majuscule et un chiffre') {
                        passwordError.innerHTML = res.data.error;
                        emailError.innerHTML = "";
                        
                        
                    } else {
                        setFormSubmit(true);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
    //********************************************************************/
    

    return (
        <Fragment>
            {formSubmit ?
                (
                    <Fragment>
                        <LogIn />
                        <h4
                            className='success'>Enregistrement réussi, veuillez vous connecter
                            <i className="fa-solid fa-circle-check"></i>
                        </h4>
                    </Fragment>
                )
                :
                (
                    <form action="" onSubmit={handleRegister} id='sign-up-form'>

                        <label htmlFor="firstName">Prénom</label>
                        <br />
                        <input
                            type="text"
                            name='firstName'
                            id='firstName'
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                        />
                        <br />

                        <label htmlFor="lastName">Nom</label>
                        <br />
                        <input
                            type="text"
                            name='lastName'
                            id='lastName'
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                        />
                        <br />
                        <div className="name-error error"></div>

                        <label htmlFor="email">Email</label>
                        <br />
                        <input
                            type="text"
                            name='email'
                            id='email'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <div className="email error"></div>
                        <br />

                        <label htmlFor="password">Mot de passe</label>
                        <br />
                        <input
                            type="password"
                            name='password'
                            id='password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <div className="password error"></div>
                        <br />

                        <label htmlFor="password-confirm">Confirmez votre mot de passe</label>
                        <br />
                        <input
                            type="password"
                            name='password'
                            id='password-confirm'
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            value={passwordConfirm}
                        />
                        <div className="password-confirm error"></div>
                        <br />

                        <input type="submit" value="Valider inscription" />
                    </form>
                )
            }
        </Fragment>
    );
};

export default SignUp;