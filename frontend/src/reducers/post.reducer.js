import { DELETE_POST, GET_POSTS, UPDATE_POST } from "../actions/post.actions";

const initialState = {};

export default function postReducer(state = initialState, action){
    switch (action.type) {
        case GET_POSTS:
            return action.payload
        
        case UPDATE_POST:
            // tu map le state
            // si le post_id du map correspond a l'id du post en payload
            // tu retourn le contenu du post, et a la ligne post_text tu met a jour avec le text du payload
            // sinon tu retourne le contenu du post inchangé
            return state.map((post)=>{
                if(post.post_id === action.payload.postId){
                    return {
                        ...post,
                        post_text : action.payload.text
                    }
                }else return post;
            })
        
        case DELETE_POST:
            // Pour mettre a jour le state tu le filtre
            // Si l'id du post (mapé) est différent de l'id du post en payload, tu le garde dans le state
            return state.filter((post)=> post.post_id !== action.payload.postId)
    
        default:
            return state
    }
}