
import * as actionTypes from '../actions/actionTypes'
const initialState = {
    post : [],
    loading : false,
    error : false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case(actionTypes.POST_START):
            return {
                ...state,
                loading : true
            }
        case(actionTypes.POST_SUCCESS):
            return {
                ...state,
                loading : false,
                post : state.post.concat(action.post)
            }
        case(actionTypes.POST_FAIL):
            return {
                ...state,
                error : action.error,
                loading : false
            }
        default : 
            return state
    }
}

export default reducer