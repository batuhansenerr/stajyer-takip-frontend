import React, { useEffect, useState } from 'react'
import './Comment.css'
import axios from 'axios';

const CommentListItem = ({comment}) => {

    const [isOwner, setIsOwner] = useState(false)
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    useEffect(() => {
        if (comment.user.username) {
            validateUser(comment.user.username)
        }
    }, [comment.user.username])

    const validateUser = (username) => {
        const loggedInUsername = localStorage.getItem("username")
        if (loggedInUsername === username) {
            setIsOwner(true)
            console.log("aaaaaaaaa");
        } else {
            console.log("wwwwwww", loggedInUsername, username);
        }
    }

    const deleteComment = async()=>{
        const token = localStorage.getItem("token")
        await axios.request({
            headers:{
                Authorization: `Bearer ${token}`
            },
            method: "DELETE",
            url: `http://localhost:8080/comment/delete/${comment.id}`
        }).then(()=>{
            console.log("buradayız");
            comment = null
        })
    }
    
  return (
    <>
        {!isEditing ? (
            <div className="commentCard">
            <div class="box"> 
                <button class="mybtn"> 
                x
                </button> 
                <div class="dropdownlist"> 
                    <a href="#" onClick={handleEditClick}>Düzenle</a> 
                    <a href="#" onClick={deleteComment}>Sil</a>
                </div> 
            </div> 
    
            <p>{comment.comment}</p>
            <div className="details">
                <div className="user"><a href={`/comment/${comment.id}`}>@{comment.user.username}</a></div>
                <div className="date">{comment.releaseDate}</div>
            </div>
            </div>
        ):(
            <div className="commentCard">
            <div class="box"> 
                <button class="mybtn"> 
                x
                </button> 
                <div class="dropdownlist"> 
                    <a href="#" onClick={handleEditClick}>Düzenle</a> 
                    <a href="#" onClick={deleteComment}>Sil</a>
                </div> 
            </div> 
    
            <textarea
                        type="text"
                    />
            <div className="details">
                <button >Kaydet</button>
                <button onClick={handleCancelEdit}>İptal</button>
            </div>
            </div>
        )}
    </>
  )
}

export default CommentListItem