import React from 'react'
import './ProfileCard.css'

const ProfileCard = ({user}) => {


    /*const [isEditing, setIsEditing] = useState(false);
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
    };*/

  return (
    <>
        <div className="profileCard">
            <img src="" alt="" className='profileCardImage'/>
            <div className="profileCardDetails">
                <h2>{user.name} {user.surname}</h2>
                <h3>@{user.username}</h3>
                {user.authorities.map((auth, index)=>(
                    <h4>- {auth.split('_')[1]}</h4>
                ))}
            </div>
            <div className="profileCardButtons">
                <button className="editButton">Düzenle</button>
                <button className="logOutButton">Çıkış Yap</button>
            </div>
        </div>
    </>
  )
}

export default ProfileCard