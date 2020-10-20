import React, { Component } from 'react'
import styles from './EditForm.module.css'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
import axios from '../../index'
class EditForm extends Component {
    
    state = {
        title :'',
        text : '',
        category: "Music",
    }
    componentDidMount(){
        axios.get('/api/post/'+this.props.match.params.post_id+'?auth='+this.props.tokenId)
        .then(response => {
            console.log(response)
            this.setState({title : response.data.title, text : response.data.text, category : response.data.category})
        })
        .catch(error=>{
            console.log(error)
        })
    }

    onPublish = (e) => {
        e.preventDefault()
        const orderData = {...this.state,userId : this.props.userId}
        // this.props.onPost(orderData,this.props.tokenId,this.props.history)
        axios.post('/api/post/'+this.props.match.params.post_id+'?auth='+this.props.tokenId,this.state)
        .then(response => {
            console.log(response)
            this.props.history.replace('/posts')
        })
        .catch(error=>{
            console.log(error)
        })
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
                    <textarea value={this.state.text} onChange={(e)=>this.setState({text : e.target.value})}></textarea>
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
        onPost : (orderData,tokenId,history) => dispatch(actions.postSubmit(orderData,tokenId,history))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(EditForm)