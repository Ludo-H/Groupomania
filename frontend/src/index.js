import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.scss'

//*********************************************************/
// Installation toujours identique de redux
// redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from "./reducers";
import { getUsers } from './actions/users.actions';

// devtools, supprimer lors de mise en production
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger'



// createstore est barré mais pas grave, on encourage juste a utiliser toolkit
//penser a enlever compose, logger, devtool lors de la mise en prod
// thunk permet de faire des requetes async avec redux
// rootreducer est créé dans son fichier
const store = createStore(
    rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
)

// la on veut avoir les infos de tous les users le plus rapidement possible, donc au plus haut de l'app
store.dispatch(getUsers());

//*********************************************************/


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);