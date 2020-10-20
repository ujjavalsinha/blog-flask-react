import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './NavigationItem.module.css'
const NavigationItem = (props) => {
    console.log(props.path)
    return (
        <li className={styles.NavigationItem}>
            <NavLink to={props.path} activeClassName={styles.active}>{props.children}</NavLink>
        </li>
    )
}

export default NavigationItem