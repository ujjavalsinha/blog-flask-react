import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import styles from './NavigationItems.module.css'
const NavigationItems = (props) => {
    console.log(props.isAuth)
    return (
        <ul className={styles.NavigationItems}>
            {!props.isAuth ? <NavigationItem path='/login'>LOGIN</NavigationItem> : null}
            {!props.isAuth ? <NavigationItem path='/signup'>SIGNUP</NavigationItem> : null}
            {props.isAuth ? <NavigationItem path='/posts'>My Posts</NavigationItem> : null}
            {props.isAuth ? <NavigationItem path='/postform'>Create Post</NavigationItem> : null}
            {props.isAuth ?<NavigationItem path='/'>LOGOUT</NavigationItem> : null}
        </ul>
    )
}

export default NavigationItems