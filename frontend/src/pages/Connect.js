import React, { useState } from 'react';
import SignUp from '../components/Log/SignUp';
import Login from "../components/Log/LogIn";

const Connect = () => {

    const [signUpButton, setSignUpButton] = useState(false);
    const [signInButton, setSignInButton] = useState(true);

    const handleSignUp = ()=>{
        setSignUpButton(true);
        setSignInButton(false);
    }

    const handleSignIn = ()=>{
        setSignUpButton(false);
        setSignInButton(true);
    }
    
    return (
        <div className='container'>
            <div className="header">
                <p>Bienvenue sur Groupomania</p>
            </div>
            <div className="logo">
                <img src="./images/logo-g.png" alt="logo groupomania" />
            </div>
            <div className="connexion">
                <div className="left-button">
                    <button onClick={()=> handleSignUp()}>
                        S'inscrire
                    </button>
                </div>
                <div className="right-button">
                    <button onClick={()=> handleSignIn()}>
                        Se connecter
                    </button>
                </div>
            </div>
            {signUpButton && <SignUp/>}
            {signInButton && <Login/>}
        </div>
    );
};

export default Connect;