
import * as actionTypes from '../actions/actionTypes'
const initialState = {
    userId : null,
    tokenId : null,
    loading : false,
    error : null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case(actionTypes.AUTH_START):
            return {
                ...state,
                loading : true
            }
        case(actionTypes.AUTH_SUCCESS):
            return {
                ...state,
                loading : false,
                userId : action.userId ? action.userId : null,
                tokenId : action.token ? action.token : null
            }
        case(actionTypes.AUTH_FAIL):
            return {
                ...state,
                loading :false,
                error : action.error
            }
        default:
            return state;
    }
}

export default reducer