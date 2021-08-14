import * as actionTypes from './actionTypes'
import axios from '../../index'

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

export const postSubmit = (postData,tokenId,history) => {
    return dispatch => {
        dispatch(postStart())
        axios.post('/api/posts?auth='+tokenId,postData)
        .then(response => {
            console.log(response)
            dispatch(postSuccess(postData))
            history.replace('/posts')
        })
        .catch(error=>{
            console.log(error)
            dispatch(postFail(error))
        })
    }
}

export const postFetchSuccess = (allPosts) => {
    return {
        type : actionTypes.POST_FETCH_SUCCESS,
        posts : allPosts
    }
}

export const postFetch = (token,userId) => {
    return dispatch => {
        dispatch(postStart())
        axios.get('/api/posts?auth='+token+'&userId='+userId)
        .then(response => {
            dispatch(postFetchSuccess(response.data))
        })
        .catch(error => {
            dispatch(postFail(error))
        })
    }
}