import React from 'react'
import styles from './NavBar.module.css'
import Logo from '../Logo/Logo'
import NavigationItems from './NavigationItems/NavigationItems'
import {connect} from 'react-redux'
import {withRouter } from 'react-router-dom'
const NavBar = (props) => {
    
    return (
            <div className={styles.NavBar}>
                <div className={styles.Logo} onClick={()=>props.history.push('/')}>
                    <Logo/>
                </div>
                <div className={styles.NavigationItems}>
                    <NavigationItems isAuth={props.isAuth}/>
                </div>
            </div>

    )
}
const mapStateToProps = state => {
    return {
        isAuth : state.auth.tokenId !==null
    }
}
export default connect(mapStateToProps)(withRouter(NavBar))