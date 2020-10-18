import React, { Component } from 'react'
import styles from './PostForm.module.css'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
class PostForm extends Component {
    state = {
        title :'',
        text : '',
        category: "Music"
    }

    onPublish = (e) => {
        e.preventDefault()
        const orderData = {...this.state,userId : this.props.userId}
        this.props.onPost(orderData,this.props.tokenId)
    }
    
    render(){
         
        return ( 
            
            <div className={styles.PostForm}>
                <form>
                    <h1>Write your blog!</h1>
                    <input type='text' value={this.state.title}  placeholder='TITLE' onChange={(e)=>this.setState({title : e.target.value})}></input>
                    <select name="categories" id="categories" value={this.state.category} onChange={(e)=>this.setState({category : e.target.value})}>
                        <option value="Music">Music</option>
                        <option value="Travel">Travel</option>
                        <option value="Fitness">Fitness</option>
                        <option value="Technology">Technology</option>
                    </select>
                    <textarea onChange={(e)=>this.setState({text : e.target.value})}></textarea>
                    <button onClick={(e)=>this.onPublish(e)}>PUBLISH</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tokenId : state.auth.tokenId,
        userId : state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onPost : (orderData,tokenId) => dispatch(actions.postSubmit(orderData,tokenId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PostForm)