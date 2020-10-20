import React, { Component } from 'react'
import styles from './PostForm.module.css'
import {connect} from 'react-redux'
import Spinner from '../Spinner/Spinner'
import * as actions from '../../store/actions/index'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
class PostForm extends Component {
    state = {
        title :'',
        text : '',
        category: "Music"
    }

    onPublish = (e) => {
        e.preventDefault()
        const orderData = {...this.state,userId : this.props.userId}
        this.props.onPost(orderData,this.props.tokenId,this.props.history)
    }

    
    render(){
        
        let postformHtml = (
            <div className={styles.PostForm}>
                    <form>
                        <h1>Write your blog!</h1>
                        <input className={styles.Title} type='text' value={this.state.title}  placeholder='TITLE' onChange={(e)=>this.setState({title : e.target.value})}></input>
                        <div>
                        <select name="categories" id="categories" value={this.state.category} onChange={(e)=>this.setState({category : e.target.value})}>
                            <option value="Music">Music</option>
                            <option value="Travel">Travel</option>
                            <option value="Fitness">Fitness</option>
                            <option value="Technology">Technology</option>
                        </select>
                        </div>
                        <textarea value={this.state.text} onChange={(e)=>this.setState({text : e.target.value})}></textarea>
                        <button onClick={(e)=>this.onPublish(e)}>PUBLISH</button>
                    </form>
                </div>
        )
        if(this.props.loading){
            postformHtml = <Spinner/>
        }
        return (postformHtml)
    }
}

const mapStateToProps = state => {
    return {
        tokenId : state.auth.tokenId,
        userId : state.auth.userId,
        loading : state.post.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onPost : (orderData,tokenId,history) => dispatch(actions.postSubmit(orderData,tokenId,history))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PostForm)