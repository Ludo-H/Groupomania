import { GET_LIKES, PATCH_LIKE } from "../actions/like.actions";

const initialState = {};

export default function likeReducer(state = initialState, action){
    switch (action.type) {
        case GET_LIKES:
            return action.payload
        
        case PATCH_LIKE:
            
            return (
                // state.slice({postId : action.payload})
                state.concat({user_id: action.payload.userId, post_id : action.payload.postId})
            )
            

        default:
            return state
    }
}