import React,{useEffect,useState} from 'react'

import Pen from '../../images/pen.svg'
import styles from './FullPost.module.css'
import {connect} from 'react-redux'
import Spinner from '../Spinner/Spinner'
import axios from '../../index'
const FullPost = (props) => {
    const post_id = props.match.params.post_id
    const [post,setPost] = useState(null)
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
    const deletePost = () => {
        axios.get('/api/post/'+post_id+'/delete?auth='+props.token)
        .then(response => {
            console.log(response)
            props.history.push('/posts')
        })
    }
    const updatePost = () => {
        props.history.push('/post/'+post_id+'/edit')
    }
    let postHtml = <Spinner/>
    if(post){
        console.log("INSIDE POST CHECKING")
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
                    <p className={styles.Author}><span><img src={Pen} alt="pen"/></span>{post.author}</p>
                    <p className={styles.Date}>{post.published_date.slice(0,15)}</p>
                </div>
                <div>
                    <p className={styles.Text}>{post.text}</p>
                </div>
                </div>
                <button onClick={updatePost} className={styles.Update}>Edit</button>
                <button onClick={deletePost} className={styles.Delete}>Delete</button>

            </div>
        )
        
    }
    return postHtml
}
const mapStateToProps = state => {
    return {
        token : state.auth.tokenId
    }
}
export default connect(mapStateToProps)(FullPost);