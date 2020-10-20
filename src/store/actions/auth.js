import * as actionTypes from './actionTypes'
import axios from '../../index.js'
export const authStart = () => {
    return {
        type : actionTypes.AUTH_START
    }
}

export const authSuccess = (tokenId,userId) => {
    return {
        type : actionTypes.AUTH_SUCCESS,
        token : tokenId,
        userId : userId
    }
}

export const authReset = () => {
    return {
        type : actionTypes.AUTH_RESET
    }
}

export const authFail = (error) => {
    return {
        type : actionTypes.AUTH_FAIL,
        error : error
    }
}

export const authSignUp = (userData,history) => {

    return dispatch => {
        dispatch(authStart())
        axios.post('/api/users',userData)
        .then(response => {
            console.log(response)
            dispatch(authSuccess())
            history.push('/login')
        })
        .catch(error => {
            console.log(error)
            dispatch(authFail(error))
        })
    }
}
export const logout = () => {
    return {
        type : actionTypes.AUTH_LOGOUT
    }
}
export const authSignIn = (userLoginData,history) => {
    return dispatch => {
        dispatch(authStart())
        axios.post('/api/login',userLoginData)
        .then(response => {
            console.log(response)
            dispatch(authSuccess(response.data.tokenId,response.data.userId))
            history.replace('/posts')
        })
        .catch(error => {
            console.log(error)
            dispatch(authFail(error))
        })
    }

}