import { DELETE_COMMENT, EDIT_COMMENT, GET_COMMENTS } from "../actions/comment.actions";


const initialState = {};

export default function commentReducer(state = initialState, action){
    switch (action.type) {
        case GET_COMMENTS:
            return action.payload
        
        case EDIT_COMMENT:
            // tu map le state
            // si le post_id du map correspond a l'id du post en payload
            // tu retourn le contenu du post, et a la ligne post_text tu met a jour avec le text du payload
            // sinon tu retourne le contenu du post inchangé
            return state.map((comment)=>{
                if(comment.comment_id === action.payload.commentId){
                    return {
                        ...comment,
                        comment_text : action.payload.text
                    }
                }else return comment;
            })
        
        case DELETE_COMMENT:
            // Pour mettre a jour le state tu le filtre
            // Si l'id du comment (mapé) est différent de l'id du comment en payload, tu le garde dans le state
            return state.filter((comment)=> comment.comment_id !== action.payload.commentId)
        
        
        default:
            return state
    }
}