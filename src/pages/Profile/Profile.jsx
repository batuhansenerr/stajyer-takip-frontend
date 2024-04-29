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
        <div className='projectlist'>
        <h3>Projeler</h3>
        <br />
        <div className="project-filter">
            <input type="text" name="" id="" placeholder='Proje Adı'/>
            <button><a href={`/project/new`}>Yeni</a></button>
        </div>
        {
            user.projects.map((project, index)=>(
                <ProjectListItem project={project}/>
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