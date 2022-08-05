import React, { useState } from 'react';
import axios from 'axios';

const LogIn = () => {

    //********************************************************************/
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    //********************************************************************/


    //********************************************************************/
    const handleLogin = (e) => {
        e.preventDefault();

        // on capte les div d'erreurs
        const emailError = document.querySelector('.email.error')
        const passwordError = document.querySelector('.password.error')

        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}api/user/login`,
            withCredentials: true,
            data: {
                email: email,
                password: password
            }
        })

            // apres le fetch, on regarde l'etat de la reponse
            // Le serveur renvoi une rep 200 si le fetch fonctionne
            // reste a voir si dans la reponse, le message indique une erreur (programmé dans le back au controller login)
            // si c'est le cas on injecte un message dans les div d'erreur
            // si pas d'erreur, on a un token qui nous est donné, on est connecté
            .then((res) => {
                if (res.data !== "Email incorrect" && res.data !== 'Mot de passe incorrect') {
                    window.location = '/home';
                } else {
                    emailError.innerHTML = "Email et/ou mot de passe incorrect(s)";
                    passwordError.innerHTML = "Email et/ou mot de passe incorrect(s)";
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
    //********************************************************************/


    return (
        <form
            action=""
            onSubmit={handleLogin}
            id='form-container'
        >
            <label htmlFor="email">Email</label>
            <br />
            <input
                type="text"
                name="email"
                id="email"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <div className="password error"></div>
            <br />

            <input type="submit" value="Connexion" /> {/*L'input de type submit permet de déclencher le submit du form, ici notre fonction */}
        </form>
    );
};

export default LogIn;