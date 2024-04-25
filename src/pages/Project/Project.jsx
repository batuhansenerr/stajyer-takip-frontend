import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CommentListItem from '../../component/Comment/CommentListItem'

const Project = () => {
const {id} = useParams()
const navigate = useNavigate()
const [project, setProject] = useState({
    id: "",
    name: "",
    initialDate: "",
    score: "",
    projectStatus: "",
    finishDate: "",
    comments: []
})

const [editedProject, setEditedProject] = useState({
    score: 0,
    name: "",
    project_status: "" 
})

const { score, name, project_status } = editedProject

const [isEditing, setIsEditing] = useState(false)
const [isMentor, setIsMentor] = useState(false)

const handleEditClick = ()=>{
    setIsEditing(true)
    editedProject.name = project.name
    editedProject.score = project.score
    editedProject.projectStatus = project.projectStatus
}

const handleCancelEdit = ()=>{
    setIsEditing(false)
}

const handleInput = (e) => {
    setEditedProject({...editedProject, [e.target.name]: e.target.value})
}

const handleSaveEdit = async(e) => {
    e.preventDefault();
    const token = localStorage.getItem("token")
    await axios.request({
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: "PATCH",
        url: `http://localhost:8080/project/${id}/update`,
        data: editedProject
    }).then((response)=>{
        console.log("düzenleme işlemi", response);
        //navigate(`/project/${id}`)
        setIsEditing(false)
    })
}

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
    const userRole = localStorage.getItem("userRole")
    if(userRole.includes("ROLE_MENTOR")){
        setIsMentor(true)
    }
},[id, isEditing])

  return (
    <>
        {isEditing ? (
        <>
        <form onSubmit={(e)=>handleSaveEdit(e)}>
            <input type="text" name="name" id="name" value={name} onChange={(e)=>handleInput(e)}/>
            <br />
            <select onSelect={(e)=>handleInput(e)}>
                <option name="projectStatus" value="ONGOING">Devam Ediyor</option>
                <option name="projectStatus" value="FINISHED">Tamamlandı</option>
                <option name="projectStatus" value="DROPPED">Duraklatıldı</option>
            </select>
            <br />
            <input type="number" min="0" max="100" name="score" id="score" value={score} onChange={(e)=>handleInput(e)}/>
            <br />
            <button type='submit'>Kaydet</button>
            <button onClick={handleCancelEdit}>İptal</button>
        </form>
        </>
        ) : (
        <>
        <div>Proje Id: {project.id}</div>
        <div>Proje Adı: {project.name}</div>
        <div>Başlangıç Tarihi: {project.initialDate}</div>
        <div>Proje Puanı: {project.score}</div>
        <div>Proje Durumu: {project.projectStatus}</div>
        <div>Proje Bitiş Tarihi: {project.finishDate}</div>
        
        <div>
        {isMentor && <button onClick={handleEditClick}>Projeyi Güncelle</button>}
        <button><Link to={`/project/${project.id}/comments/new`}>Yorum Yap</Link></button>
        <h4>Kullanıcı Yorumları</h4>
        {
            project.comments.map((comment, index)=>(
                <CommentListItem comment={comment}/>
                /*<div key={index}>
                    <Link to={`/comment/${comment.id}`}>
                    <h5>yorum {index+1}</h5>
                    <div>Yorum Id: {comment.id}</div>
                    <div>Yorum: {comment.comment}</div>
                    <div>Yayın Tarihi: {comment.releaseDate}</div>
                    <h6>Yorum sahibi</h6>
                    <div>Proje Puanı: {comment.user.name}</div>
                    <div>Proje Durumu: {comment.user.surname}</div>
                    <div>Proje Bitiş Tarihi: {comment.user.id}</div>
                    <br />
                    </Link>
                </div>*/
            ))
        }
        </div>
        </>
        )}
        
    </>
  )
}

export default Project