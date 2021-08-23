import React, {Component} from 'react'
import * as actions from '../../store/actions/index'
import {connect } from 'react-redux'
import styles from './HomePage.module.css'
import Post from '../Post/Post'
import Spinner from '../Spinner/Spinner'
import axios from 'axios'

class HomePage extends Component{
    state = {
        posts : null
    }

    componentDidMount(){
        axios.get('https://ujjavalsblog.herokuapp.com/api/allposts')
        .then(response => {
            this.setState({posts : response.data})
        })
        .catch(error=> {
            console.log(error)
        })
    }

    showFullPost(post_id){
        console.log("IS AUTH : ",this.props.isAuth)
        if(this.props.isAuth){
            this.props.history.push({pathname : '/post/'+post_id})
        }
        else{
            console.log("inside else")
            this.props.history.push('/login')
        }
    }
    render(){
        let allPosts = <Spinner/>
        if(this.state.posts){
            allPosts = (
                <div className={styles.HomePage}>
                {this.state.posts.map(post => 
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
        isAuth : state.auth.tokenId !==null,
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

export default connect(mapStateToProps,mapDispatchToProps)(HomePage)
