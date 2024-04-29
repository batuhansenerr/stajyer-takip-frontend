import React, { useEffect, useState } from 'react'
import './Comment.css'
import axios from 'axios';

const CommentListItem = ({comment}) => {

    const [isOwner, setIsOwner] = useState(false)
    const [isEditing, setIsEditing] = useState(false);
    const [newComment, setNewComment] = useState({
        comment: comment.comment
    })

    const { comment: commentText } = newComment;

    const handleInput = (e) => {
        setNewComment({...newComment, [e.target.name]: e.target.value})
    }

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const updateComment = async () => {
        const token = localStorage.getItem("token")
        await axios.request({
            headers:{
                Authorization: `Bearer ${token}`
            },
            method: "PUT",
            url: `http://localhost:8080/comment/update/${comment.id}`,
            data: {
                comment: newComment.comment
            }
        }).then(() => {
            setIsEditing(false);
        })
    }

    useEffect(() => {
        if (comment.user.username) {
            validateUser(comment.user.username)
        }
    }, [comment.user.username])

    const validateUser = (username) => {
        const loggedInUsername = localStorage.getItem("username")
        if (loggedInUsername === username) {
            setIsOwner(true)
        }
    }

    const deleteComment = async () => {
        const token = localStorage.getItem("token")
        await axios.request({
            headers:{
                Authorization: `Bearer ${token}`
            },
            method: "DELETE",
            url: `http://localhost:8080/comment/delete/${comment.id}`
        }).then(() => {
            console.log("buradayız");
            comment = null
        })
    }

    return (
        <>
            {!isEditing ? (
                <div className="commentCard">
                {isOwner ? (<div class="box"> 
                    <button class="mybtn"> 
                    <div class="container">
                        <div class="bar1"></div>
                        <div class="bar2"></div>
                        <div class="bar3"></div>
                    </div>
                    </button> 
                    <div class="dropdownlist"> 
                        <a href="#" onClick={handleEditClick}>Düzenle</a> 
                        <a href="#" onClick={deleteComment}>Sil</a>
                    </div> 
                </div>) : (<></>)}
        
                <p>{comment.comment}</p>
                <div className="details">
                    <div className="user"><a href={`/comment/${comment.id}`}>@{comment.user.username}</a></div>
                    <div className="date">{comment.releaseDate}</div>
                </div>
                </div>
            ) : (
                <div className="commentCard">
                    <textarea
                        type="text"
                        value={commentText}
                        name='comment'
                        onChange={handleInput}
                    />
                    <br />
                    <div className="details">
                        <button onClick={updateComment}>Kaydet</button>
                        <button onClick={handleCancelEdit}>İptal</button>
                    </div>
                </div>
            )}
        </>
    )
}


export default CommentListItem