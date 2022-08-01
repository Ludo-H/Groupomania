// ce dossier est appelé quand on appelle le dossier reducers en général
// ce fichier va reprendre tous les reducers pour les envoyer dans le store
// le store contiendra donc toutes les infos récupérés des reducers, permettant de ne plus faire appel à la BDD 
// a chaque fois que l'on veut une donnée
// ici les données user, post, comm ....

// on importe la fonction quui permet de regrouper les reducers pour les envoyer
// et on importe aussi tous les reducers
import {combineReducers} from 'redux';
import userReducer from './user.reducer';
import usersReducer from './users.reducer';
import postReducer from './post.reducer';
import likeReducer from './like.reducer';
import commentReducer from './comment.reducer';

export default combineReducers({
    userReducer,
    usersReducer,
    postReducer,
    likeReducer,
    commentReducer,
})