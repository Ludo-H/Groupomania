// reducer pour récupérer les données de l'user

import { GET_USER} from "../actions/user.actions";

// state de base des reducers, vide
// une fois rempli, il permettra de ne plus faire appel a la BDD
const initialState = {}

// Puis on exporte sa fonction qui fait appel au state et une action
// la fonction reprend un switch qui varie selon le type de l'action (voir noms des actions)
// le return du switch va incrémenter l'initialstate, donc le faire grossir petit a petit
export default function userReducer(state = initialState, action){
    switch (action.type) {
        case GET_USER:
            return action.payload;
    
        default:
            return state;
    }
}