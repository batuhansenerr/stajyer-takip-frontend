import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Project = () => {
const {id} = useParams()
const [project, setProject] = useState({
    id: "",
    name: "",
    initialDate: "",
    score: "",
    projectStatus: "",
    finishDate: "",
    comments: []
})

const getProject = async() => {
    const token = localStorage.getItem("token")
    await axios.request({
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: "GET",
        url: `http://localhost:8080/project/${id}`
    }).then(response=>{
        setProject(response.data)
        console.log(response);
    })
}

useEffect(()=>{
    getProject()
},[id])

  return (
    <>
        <div>Proje Id: {project.id}</div>
        <div>Proje Adı: {project.name}</div>
        <div>Başlangıç Tarihi: {project.initialDate}</div>
        <div>Proje Puanı: {project.score}</div>
        <div>Proje Durumu: {project.projectStatus}</div>
        <div>Proje Bitiş Tarihi: {project.finishDate}</div>
        <div>
        <h4>Kullanıcının Yorumları</h4>
        {
            project.comments.map((comment, index)=>(
                <div key={index}>
                    <h5>yorum {index+1}</h5>
                    <div>Proje Id: {comment.id}</div>
                    <div>Proje Adı: {comment.comment}</div>
                    <div>Başlangıç Tarihi: {comment.releaseDate}</div>
                    <h6>Yorum sahibi</h6>
                    <div>Proje Puanı: {comment.user.name}</div>
                    <div>Proje Durumu: {comment.user.surname}</div>
                    <div>Proje Bitiş Tarihi: {comment.user.id}</div>
                    <br />
                </div>
            ))
        }
        </div>
    </>
  )
}

export default Project