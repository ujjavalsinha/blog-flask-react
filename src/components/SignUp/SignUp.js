import React,{Component} from 'react'
import styles from './SignUp.module.css'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
class SignUp extends Component{
    state = {
        name : '',
        email : '',
        password : '',
        city : '',
    }
    onSignUp(e){
        e.preventDefault()
        const signUpData = {...this.state}
        this.props.onAuthSignUp(signUpData,this.props.history)
    }
    render(){
        return (
            <div className={styles.SignUp}>
                
                <form>
                    <h1>SIGNUP FORM</h1>
                    <input type='text' value={this.state.name} placeholder='FULL NAME' onChange={(e)=>this.setState({name : e.target.value})}></input>
                    <input type='email' value={this.state.email} placeholder='EMAIL ' onChange={(e)=>this.setState({email : e.target.value})}></input>
                    <input type='password' value={this.state.password} placeholder='PASSWORD ' onChange={(e)=>this.setState({password : e.target.value})}></input>
                    <input value={this.state.city} placeholder="CITY" onChange={(e)=>this.setState({city : e.target.value})}></input>
                    <button onClick={(e)=>{this.onSignUp(e)}}>SIGN UP</button>
                </form>

            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuthSignUp : (signupdata,history) => dispatch(actions.authSignUp(signupdata,history))
    }
}
export default connect(null,mapDispatchToProps)(SignUp)


