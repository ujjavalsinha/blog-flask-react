import * as actionTypes from './actionTypes'
import axios from 'axios'
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

export const authFail = () => {
    return {
        type : actionTypes.AUTH_FAIL
    }
}

export const authSignUp = (userData,history) => {

    return dispatch => {
        dispatch(authStart())
        axios.post('http://127.0.0.1:5000/users',userData)
        .then(response => {
            console.log(response)
            dispatch(authSuccess())
            history.push('/login')
        })
        .catch(error => {
            console.log(error)
            dispatch(authFail())
        })
    }
}

export const authSignIn = (userLoginData,history) => {
    return dispatch => {
        dispatch(authStart())
        axios.post('http://127.0.0.1:5000/login',userLoginData)
        .then(response => {
            console.log(response)
            dispatch(authSuccess(response.data.tokenId,response.data.userId))
            history.replace('/')
        })
        .catch(error => {
            console.log(error)
            dispatch(authFail(error))
        })
    }

}