import React from 'react'
import styles from './Post.module.css'
import { makeStyles, withTheme } from '@material-ui/core/styles';
import Pen from '../../images/pen.svg'

const Post = (props) => {
    
    return (
        <div className={styles.Post} >
            <div>
              <p className={styles.Title} onClick={props.clicked}>{props.post.title}</p>
            </div>
            <div>
              <p className={styles.Category}>{props.post.category}</p>
            </div>
            <div>
              <p className={styles.Text}>{props.post.text.slice(0,200)+'.....'}</p>
            </div>
        </div>
    )
}

export default Post