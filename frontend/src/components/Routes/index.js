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
                <Route path='/' element={<Connect/>} />
                <Route path='/profil' element={<Profil/>} />
                <Route path='/home' element={<Home/>} />
                <Route path='*' element={<Error/>} />
            </Routes>
        </Router>
    );
};

export default Index;