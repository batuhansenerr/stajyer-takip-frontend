import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfileCard.css';
import { useNavigate } from 'react-router-dom';

const ProfileCard = ({ user }) => {
    const navigate = useNavigate()
    const [isEditing, setIsEditing] = useState(false);
    const [newUser, setNewUser] = useState({
        username: user.username,
        name: user.name,
        surname: user.surname,
        oldPassword: "",
        password: ""
    });

    const handleEditClick = () => {
        setIsEditing(true);
        setNewUser({
            username: user.username,
            name: user.name,
            surname: user.surname,
            oldPassword: "",
            password: ""
        });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    }

    const logOut = () => {
        localStorage.clear()
        navigate("/login")
    }

    const handleSaveEdit = async () => {
        const token = localStorage.getItem("token");

        await axios.request({
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: "PATCH",
            url: `http://localhost:8080/auth/update`,
            data: newUser
        }).then(response => {
            setIsEditing(false)
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    return (
        <>
            <div className="profileCard">
                <img src="" alt="" className='profileCardImage' />
                <div className="profileCardDetails">
                    {isEditing ? (
                        <>
                        <div className="inputs">
                            <input className='inputItem' type="text" placeholder='İsim' name="name" value={newUser.name} onChange={handleChange} />
                            <input className='inputItem' type="text" placeholder='Soyisim' name="surname" value={newUser.surname} onChange={handleChange} />
                            <input className='inputItem' type="text" placeholder='username' name="username" value={newUser.username} onChange={handleChange} />
                            <input className='inputItem' type="text" placeholder='Şifre (* Yeni Şifre İçin Gerekli)' name="oldPassword" value={newUser.oldPassword} onChange={handleChange} />
                            <input className='inputItem' type="text" placeholder='Yeni Şifre' name="password" value={newUser.password} onChange={handleChange} />
                        </div>
                        </>
                    ) : (
                        <>
                            <h2>{user.name} {user.surname}</h2>
                            <h3>@{user.username}</h3>
                            {user.authorities.map((auth, index) => (
                                <h4 key={index}>- {auth.split('_')[1]}</h4>
                            ))}
                        </>
                    )}
                </div>
                <div className="profileCardButtons">
                    {isEditing ? (
                        <>
                            <button className="saveButton" onClick={handleSaveEdit}>Kaydet</button>
                            <button className="cancelButton" onClick={handleCancelEdit}>İptal</button>
                        </>
                    ) : (
                        <>
                        <button className="editButton" onClick={handleEditClick}>Düzenle</button>
                        <button className="logOutButton" onClick={logOut}>Çıkış Yap</button>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default ProfileCard;
