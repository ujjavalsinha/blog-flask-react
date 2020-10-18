import React from 'react';
import {Route,Switch } from 'react-router-dom'
import SignUp from './components/SignUp/SignUp'
import NavBar from './components/NavBar/NavBar'
import Login from './components/Login/Login'
import PostForm from './components/PostForm/PostForm'
import Posts from './components/Posts/Posts'
import {connect } from 'react-redux'
function App(props) {
  return (
    <div>
      <NavBar/>
      {props.isAuth ? 
        <Switch>
          <Route path="/" exact render={()=><h1>HOMEPAGE</h1>}/>
          <Route path="/postform" component={PostForm}/>
          <Route path="/posts" component={Posts}/>
        </Switch>
      :
        <Switch>
          <Route path="/" exact render={()=><h1>HOMEPAGE</h1>}/>
          <Route path="/signup" exact component={SignUp}/>
          <Route path="/login" component={Login}/>
        </Switch>}
    </div>
  )
    
}
const mapStateToProps = state => {
  return {
    isAuth : state.auth.tokenId!==null
  }
}
export default connect(mapStateToProps)(App);
