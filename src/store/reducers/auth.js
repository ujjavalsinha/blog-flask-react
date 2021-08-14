
import * as actionTypes from '../actions/actionTypes'
const initialState = {
    userId : null,
    tokenId : null,
    loading : false,
    error : null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case(actionTypes.AUTH_RESET):
            return {
                ...state,
                userId : null,
                tokenId : null,
                loading : false,
                error : null
            }
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
        case(actionTypes.AUTH_LOGOUT):
            return {
                ...state,
                tokenId : null,
                userId : null
            }
        default:
            return state;
    }
}

export default reducer