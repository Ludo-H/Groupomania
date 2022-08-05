import React from 'react';
import {BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Connect from '../../pages/Connect';
import Profil from '../../pages/Profil';
import Home from '../../pages/Home';
import Error from "../../pages/Error";

const Index = () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Connect/>} />
                <Route exact path='/profil' element={<Profil/>} />
                <Route exact path='/home' element={<Home/>} />
                <Route path='*' element={<Error/>} />
            </Routes>
        </Router>
    );
};

export default Index;