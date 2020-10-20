import React from 'react';
import {Route,Switch } from 'react-router-dom'
import SignUp from './components/SignUp/SignUp'
import NavBar from './components/NavBar/NavBar'
import Login from './components/Login/Login'
import PostForm from './components/PostForm/PostForm'
import Posts from './components/Posts/Posts'
import {connect } from 'react-redux'
import FullPost from './components/FullPost/FullPost'
import Logout from './components/Logout/Logout'
import EditForm from './components/EditForm/EditForm'
function App(props) {
  return (
    <div>
      <NavBar/>
      {props.isAuth ? 
        <Switch>
          <Route path="/" exact render={()=><h1>HOMEPAGE</h1>}/>
          <Route path="/postform" component={PostForm}/>
          <Route path="/post/:post_id/edit" component={EditForm}/>
          <Route path="/post/:post_id" component={FullPost}/>
          <Route path="/posts" component={Posts}/>
          <Route path="/logout" component={Logout}/>
          
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
