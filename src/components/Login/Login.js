import React,{useState,useEffect} from 'react'
import styles from './Login.module.css'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'
const emailRegExp = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)
const Login = (props) => {
    const [email,setEmail] = useState('')
    const [submit , setSubmit] = useState(false)
    const [password,setPassword] = useState('')
    const [errors, setErrors] = useState({email : '',password : ''})
    useEffect(()=> {
        props.onLoginReset()
    },[])
    const disableSubmit = () => {
        if(email === '' || password===''){
            return true
        }
        return false
       }
    const onLogin = (e) => {
        e.preventDefault()
        setSubmit(true)
        for(let inp in errors){
            if(errors[inp]!==''){
                return
            }
        }
        const userData = {'email' : email, 'password' : password}
        props.onAuthLogin(userData,props.history)
    }
    const handleChange = (e) => {
        setSubmit(false)
        const target = e.target
        let error = ''
        switch(target.name){
            case('email'):
                setEmail(target.value)
                error = emailRegExp.test(target.value) ? '' : 'Invalid Email'
                break;
            case('password'):
                setPassword(target.value)
                break;
            default:
                break;
        }
        setErrors({...errors, [target.name] : error})
    }
    let form = (
        <form>
            <h1>LOGIN FORM</h1>
            {props.error ? <p style={{color : 'red'}}>Incorrect credentials</p> : null}
            <input name='email' type='email' placeholder='EMAIL' value={email} onChange={(e)=>handleChange(e)}></input>
            {submit ? <p style={{color : 'red'}}>{errors.email}</p> : <p></p>}
            <input name='password' type='password' placeholder='PASSWORD' value={password} onChange={(e)=>handleChange(e)}></input>
            {submit ? <p style={{color : 'red'}}>{errors.password}</p> : <p></p>}
            <button disabled={disableSubmit()} onClick={(e)=>{onLogin(e)}}>LogIn</button>
            <NavLink to='/signup'></NavLink>

        </form>
    )
    if(props.loading){
        form = <Spinner/>
    }
    return (
        <div className={styles.Login}>
            {form}
        </div>
    )
}
const mapStateToProps = state => {
    return {
        loading : state.auth.loading,
        error : state.auth.error !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuthLogin : (userdata,history) => dispatch(actions.authSignIn(userdata,history)),
        onLoginReset : () => dispatch(actions.authReset())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)