import { GET_LIKES, PATCH_LIKE } from "../actions/like.actions";

const initialState = {};

export default function likeReducer(state = initialState, action){
    switch (action.type) {
        case GET_LIKES:
            return action.payload
        
        case PATCH_LIKE:
            
            return state.map((like) => {
                if (like.user_id === action.payload.userId && like.post_id === action.payload.postId) {
                    return {
                        ...like,
                        post_id : action.payload.postId,
                        user_id : action.payload.userId
                    };
                } else return like;
            });
                // state.slice({user_id: action.payload.userId, post_id : action.payload.postId})
                // state.concat({user_id: action.payload.userId, post_id : action.payload.postId})

                // ...state,
                // post_id : action.payload.postId,
                // user_id : action.payload.userId,
                
                    // state.map((like)=>{
                    //     if(action.payload.postId === like.post_id && action.payload.userId === like.user_id){
                    //         //jenleve le like du state
                    //         console.log('enleve');
                    //         return {
                    //             ...state,

                    //         }
                            
                    //         // state.delete({user_id: action.payload.userId, post_id : action.payload.postId})
                    //         // state.
                    //     }else{
                    //         // je rajoute le like au state
                    //         console.log('rajoute');
                    //             return like
                    //     }


                        // if(like.user_id === action.payload.userId){
                        //     return{
                        //         ...like,
                        //         post_id : action.payload.postId,
                        //         user_id : action.payload.userId
                        //     }
                        // }
                        // return like
                    
                
            

        default:
            return state
    }
}