import React,{Component} from 'react'
import styles from './SignUp.module.css'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
const emailRegExp = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)
class SignUp extends Component{
    state = {
        name : '',
        email : '',
        password : '',
        city : '',
        errors : {
            name :'',
            email : '',
            password : '',
            city : ''
        },
        submit : false
    }
    disableSubmit = () => {
     for( let inp in this.state.errors){
            if(this.state[inp] === ''){
                return true
            }
        }
        return false
    }
    onSignUp(e){
        e.preventDefault()
        this.setState({submit : true})
     for( let inp in this.state.errors){
            if(this.state.errors[inp] !== ''){
                return
            }
        }
        const signUpData = {...this.state}
        this.props.onAuthSignUp(signUpData,this.props.history)
    }
    handleChange = (e) => {
        this.setState({submit : false})
        const target = e.target
        let error = ''
        switch(target.name){
            case('name'):
                error = target.value.length<5 ? 'Name should have more than 5 characters' : ''
                break;
            case('email'):
                error = emailRegExp.test(target.value) ? '' : 'Invalid Email'
                break;
            case('password'):
                error = target.value.length > 8 ? '' : "Password should be atleast 8 characters long"
                break;
            default:
                break;
        }
        this.setState({errors : {...this.state.errors, [target.name] : error}, [target.name] : target.value})

    }
    render(){
        return (
            <div className={styles.SignUp}>
                
                <form>
                    <h1>SIGNUP FORM</h1>
                    {this.props.error ? <p style={{color : 'green'}}>Email already exists</p> : null}
                    <label htmlFor='name'>Name</label>
                    <input name='name' type='text' value={this.state.name} placeholder='eg: John Smith' autoComplete="off" onChange={(e)=>this.handleChange(e)}></input>
                    {this.state.submit ? <p style={{color : 'red'}}>{this.state.errors.name}</p> : <p></p>}
                    <label htmlFor='email'>Email</label>
                    <input name='email' type='email' value={this.state.email} placeholder='eg: example@gmail.com' autoComplete="off" onChange={(e)=>this.handleChange(e)}></input>
                    {this.state.submit ? <p style={{color : 'red'}}>{this.state.errors.email}</p> : <p></p>}
                    <label htmlFor='password'>Password</label>
                    <input name='password' type='password' value={this.state.password} placeholder='••••••••' onChange={(e)=>this.handleChange(e)}></input>
                    {this.state.submit ? <p style={{color : 'red'}}>{this.state.errors.password}</p> :<p></p>}
                    <label htmlFor='city'>City</label>
                    <input name='city' value={this.state.city} placeholder="eg: Mumbai" autoComplete="off" onChange={(e)=>this.handleChange(e)}></input>
                    {this.state.submit ? <p style={{color : 'red'}}>{this.state.errors.city}</p> : <p></p>}
                    <button disabled={this.disableSubmit()} onClick={(e)=>{this.onSignUp(e)}}>SIGN UP</button>
                </form>

            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        loading : state.auth.loading,
        error : state.auth.error !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuthSignUp : (signupdata,history) => dispatch(actions.authSignUp(signupdata,history)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignUp)


