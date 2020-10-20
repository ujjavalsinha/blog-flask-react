import React, {Component} from 'react'
import * as actions from '../../store/actions/index'
import {connect } from 'react-redux'
import styles from './Posts.module.css'
import Post from '../Post/Post'
import Spinner from '../Spinner/Spinner'
class Posts extends Component{
    componentDidMount(){
        this.props.onPostsFetch(this.props.token,this.props.userId)
    }

    showFullPost(post_id){
        console.log("POST ID INSIDE SHO")
        this.props.history.push({pathname : '/post/'+post_id})
    }
    render(){
        let allPosts = <Spinner/>
        if(this.props.posts){
            allPosts = (
                <div className={styles.Posts}>
                {this.props.posts.map(post => 
                    <Post key={new Date(post.published_date).getSeconds()} clicked={() => this.showFullPost(post.post_id)} post={post}/>
                )}
            </div>
            )
        }
        return allPosts
    }
}

const mapStateToProps = state => {
    return {
        posts : state.post.post,
        token : state.auth.tokenId,
        userId : state.auth.userId,
        loading : state.post.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onPostsFetch : (token,userId) => dispatch(actions.postFetch(token,userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Posts)