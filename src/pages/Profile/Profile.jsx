import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectListItem from '../../component/Project/ProjectListItem'
import './Profile.css'
import ProfileCard from '../../component/Profile/ProfileCard'

const Profile = () => {

const [user, setUser] = useState({
    name: "",
    surname: "",
    id: "",
    password: "",
    projects: [],
    comments: [],
    authorities: []
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
        localStorage.setItem("userRole", response.data.authorities)
        localStorage.setItem("username", response.data.username)
    })
}

  return (
    <>
    <div className="major-y">
        <ProfileCard user={user}/>
        <div>
        <h4>Projeler</h4>
        <br />
        <div className="project-filter">
            <input type="text" name="" id="" placeholder='Proje Adı'/>
            <button>Yeni</button>
        </div>
        {
            user.projects.map((project, index)=>(
                <ProjectListItem project={project}/>
                /* 
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
                */
            ))
        }
        </div>
        {/*<div>
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
    </div>*/}
    </div>
    </>
  )
}

export default Profile