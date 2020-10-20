import React, { Component } from 'react'
import styles from './PostForm.module.css'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
import {Editor } from 'react-draft-wysiwyg'
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
class PostForm extends Component {
    state = {
        title :'',
        text : EditorState.createEmpty(),
        category: "Music"
    }
    onEditorStateChange = (editorState) => {
        this.setState({
          editorState,
        });
      };
    onPublish = (e) => {
        e.preventDefault()
        const orderData = {...this.state,userId : this.props.userId}
        this.props.onPost(orderData,this.props.tokenId,this.props.history)
    }

    
    render(){
        const { editorState } = this.state;
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
                    <Editor 
                    editorState={editorState} 
                    onEditorStateChange={this.onEditorStateChange}
                    wrapperClassName="wrapper-class"
                    wrapperStyle={{width:'60%',height : '200px'}}
                    />
                    
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
export default connect(mapStateToProps,mapDispatchToProps)(PostForm)