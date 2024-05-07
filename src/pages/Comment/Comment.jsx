import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Comment = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [newcomment, setNewcomment] = useState({
        comment: "",
        id: "",
        releaseDate: "",
        user: {
            username: "",
            name: "",
            surname: "",
            id: ""
        },
        project: {
            id: ""
        }
    })

    const [isOwner, setIsOwner] = useState(false)

    const getComment = async () => {
        const token = localStorage.getItem("token")
        await axios.request({
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: "GET",
            url: `http://localhost:8080/comment/${id}`
        }).then(response => {
            setNewcomment(response.data)
            validateUser(response.data.user.username)
            console.log(response);
        })
    }

    const validateUser = (username) => {
        const loggedInUsername = localStorage.getItem("username")
        if (loggedInUsername === username) {
            setIsOwner(true)
            console.log("User Validation Comment Owning true");
        } else {
            console.log("User Validation Comment Owning false", loggedInUsername, username);
        }
    }

    const deleteComment = async()=>{
        const token = localStorage.getItem("token")
        await axios.request({
            headers:{
                Authorization: `Bearer ${token}`
            },
            method: "DELETE",
            url: `http://localhost:8080/comment/delete/${id}`
        }).then(()=>{
            console.log("delete comment");
            navigate(`/project/${newcomment.project.id}`)
        })
    }

    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState("");

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedComment(newcomment.comment);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleSaveEdit = async () => {
        const token = localStorage.getItem("token");
        const updatedComment = { ...newcomment, comment: editedComment };

        await axios.request({
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: "PATCH",
            url: `http://localhost:8080/comment/update/${id}`,
            data: updatedComment
        }).then(response => {
            setNewcomment(response.data);
            setIsEditing(false);
        });
    };

    useEffect(() => {
        getComment()
    }, [id])

    useEffect(() => {
        if (newcomment.user.username) {
            validateUser(newcomment.user.username)
        }
    }, [newcomment.user.username])

    return (
         <>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                    />
                    <button onClick={handleSaveEdit}>Kaydet</button>
                    <button onClick={handleCancelEdit}>İptal</button>
                </div>
            ) : (
                <>
                    <div>Yorum Id: {newcomment.id}</div>
                    <div>Yorum: {newcomment.comment}</div>
                    <div>Yayınlanma Tarihi: {newcomment.releaseDate}</div>

                    {isOwner && <button onClick={handleEditClick}>Yorumu Düzenle</button>}
                    {isOwner && <button onClick={deleteComment}>Yorum Sil</button>}
                </>
            )}
        </>
    )
}

export default Comment
