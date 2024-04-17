import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {

const [user, setUser] = useState({
    name: "",
    surname: "",
    id: "",
    password: "",
    projects: [],
    comments: []
})

useEffect(()=>{
    getUser()
},[])

const getUser = async() => {
    const token = localStorage.getItem("token")
    await axios.request({
        headers:{
            Authorization: `Bearer ${token}`
        },
        method: "GET",
        url: `http://localhost:8080/auth/profile`
    }).then(response=>{
        setUser(response.data)
        console.log(response.data);
    })
}

  return (
    <>
        <h3>{user.id}</h3>
        <h3>{user.name} {user.surname}</h3>
        <div>
        <h4>Projeler</h4>
        {
            user.projects.map((project, index)=>(
                <div key={index}>
                    <Link to={`/project/${project.id}`}>
                    <div>Proje Id: {project.id}</div>
                    <div>Proje Adı: {project.name}</div>
                    <div>Başlangıç Tarihi: {project.initialDate}</div>
                    <div>Proje Puanı: {project.score}</div>
                    <div>Proje Durumu: {project.projectStatus}</div>
                    <div>Proje Bitiş Tarihi: {project.finishDate}</div>
                    </Link>
                    <br />
                </div>
            ))
        }
        </div>
        <div>
        <h4>Kullanıcının Yorumları</h4>
        {
            user.comments.map((comment, index)=>(
                <div key={index}>
                    <div>Proje Id: {comment.id}</div>
                    <div>Proje Adı: {comment.name}</div>
                    <div>Başlangıç Tarihi: {project.initialDate}</div>
                    <div>Proje Puanı: {project.score}</div>
                    <div>Proje Durumu: {project.projectStatus}</div>
                    <div>Proje Bitiş Tarihi: {project.finishDate}</div>
                    <br />
                </div>
            ))
        }
        </div>
    </>
  )
}

export default Profile