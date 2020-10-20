import React from 'react';
import styles from './Comment.module.css'
import avatar from '../../images/avatar.svg'
const Comment = (props) => {
    return (
        <div className={styles.Comment}>
            <div className={styles.AuthorAvatar}>
                <p className={styles.Author}><span><img src={avatar} alt='avatar'/></span>{props.comment.author}</p>
            </div>
            <div className={styles.TextDate}>
                <p className={styles.Text}>{props.comment.text}</p>
                <p className={styles.Date}>{props.comment.created_at.slice(0,15)}</p>
            </div>
        </div>
    )
}

export default Comment;