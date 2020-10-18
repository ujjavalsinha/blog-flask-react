import * as actionTypes from './actionTypes'
import axios from 'axios'

export const postStart = () => {
    console.log(actionTypes.POST_START)
    return {
        type : actionTypes.POST_START
    }
}

export const postFail = (error) => {
    return {
        type : actionTypes.POST_FAIL,
        error : error
    }
}

export const postSuccess = (post) => {
    return {
        type : actionTypes.POST_SUCCESS,
        post : post
    }
}

export const postSubmit = (postData,tokenId) => {
    return dispatch => {
        dispatch(postStart())
        axios.post('http://127.0.0.1:5000/posts?auth='+tokenId,postData)
        .then(response => {
            console.log(response)
            dispatch(postSuccess(postData))
        })
        .catch(error=>{
            console.log(error)
            dispatch(postFail(error))
        })
    }
}