import React,{useState} from 'react'
import styles from './Login.module.css'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'

const Login = (props) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const onLogin = (e) => {
        e.preventDefault()
        const userData = {'email' : email, 'password' : password}
        props.onAuthLogin(userData,props.history)
    }
    return (
        <div className={styles.Login}>
            <form>
                <h1>LOGIN FORM</h1>
                <input type='email' placeholder='EMAIL' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                <input type='password' placeholder='PASSWORD' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                <button onClick={(e)=>{onLogin(e)}}>LogIn</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthLogin : (userdata,history) => dispatch(actions.authSignIn(userdata,history))
    }
}
export default connect(null,mapDispatchToProps)(Login)