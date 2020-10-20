import React,{useEffect,useState} from 'react'
import Comment from '../Comment/Comment'
import Pen from '../../images/pen.svg'
import styles from './FullPost.module.css'
import {connect} from 'react-redux'
import Spinner from '../Spinner/Spinner'
import axios from '../../index'
import avatar from '../../images/avatar.svg'
const FullPost = (props) => {
    const post_id = props.match.params.post_id
    const [post,setPost] = useState(null)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState(null)
    useEffect(()=>{
        axios.get('/api/post/'+post_id+'?auth='+props.token)
        .then(response => {
            console.log(response)
            setPost(response.data)
        })
        .catch(error=>{
            console.log(error)
        })
    },[])
    useEffect(()=>{
        fetchComments()
    },[])
    const deletePost = () => {
        axios.get('/api/post/'+post_id+'/delete?auth='+props.token)
        .then(response => {
            console.log(response)
            props.history.push('/posts')
        })
    }
    const fetchComments = () => {
        axios.get('/api/post/'+post_id+'/comments')
        .then(response => {
            console.log(response)
            setComments(response.data)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    const updatePost = () => {
        props.history.push('/post/'+post_id+'/edit')
    }

    const handleCommentPost = (e) => {
        e.preventDefault()
        const commentData = {
            comment : comment,
            userId : props.userId
        }
        axios.post('/api/post/'+post_id+'/comment?auth='+props.token, commentData)
        .then(response => {
            console.log(response)
            setComment('')
            fetchComments()
        })
        .catch(error => {
            console.log(error)
        })
    }
    let commentsHtml = <Spinner/>
    if(comments){
        commentsHtml = comments.map(com=> (
            <Comment comment={com}/>
        ))
    }
    let textHtml = null
    let postHtml = <Spinner/>
    if(post){
        textHtml = (
            post.text.split('\n').map(text => (
                <p>{text}</p>
            ))
        )
        postHtml = (
            <div className={styles.FullPost} >
                <div className={styles.Container}>
                    <div>
                        <p className={styles.Title} >{post.title}</p>
                    </div>
                    <div>
                        <p className={styles.Category}>{post.category}</p>
                    </div>
                    <div className={styles.AuthorDate}>
                        <p className={styles.Author}><span><img src={avatar} alt="pen"/></span><span className={styles.AuthorSpan}>{post.author}</span></p>
                        <p className={styles.Date}>{post.published_date.slice(0,15)}</p>
                    </div>
                    <div>
                        {textHtml}
                    </div>
                </div>
                {post.user_id === props.userId ?
                <div className={styles.EditDelete}>
                    <button onClick={updatePost} className={styles.Update}>Edit</button>
                    <button onClick={deletePost} className={styles.Delete}>Delete</button>
                </div>
                :
                null
                }
                {commentsHtml}
                <form className={styles.CommentForm}>
                    <textarea className={styles.TextArea} placeholder='Leave a comment here' value={comment} onChange={(e)=>setComment(e.target.value)}/>
                    <button className={styles.CommentButton} onClick={(e)=>handleCommentPost(e)}>Submit</button>
                </form>

            </div>
        )
        
    }
    return postHtml
}
const mapStateToProps = state => {
    return {
        token : state.auth.tokenId,
        userId : state.auth.userId,
        isAuth : state.auth.tokenId!==null
    }
}
export default connect(mapStateToProps)(FullPost);