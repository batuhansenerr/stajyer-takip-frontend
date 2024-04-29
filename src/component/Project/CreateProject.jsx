import React, { useState } from 'react'
import './CreateProject.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateProject = () => {

    const navigate = useNavigate()
    const[newProject, setNewProject] = useState({
        name: "",
        requirements: ""
    })

    const{ name, requirements } = newProject

    const handleInput = (e) => {
        setNewProject({...newProject, [e.target.name]:e.target.value})
    }

    const saveProject = async(e) => {
        const token = localStorage.getItem("token")
        e.preventDefault()
        await axios.request({
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: "POST",
            url: "http://localhost:8080/project/add",
            data: newProject
        }).then(response=>{
            console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwW");
            navigate(`/project/${response.data.id}`)
        })
    }

  return (
    <>
    <form className="createProjectCard" onSubmit={(e)=>saveProject(e)}>
        <h2>Proje Oluştur</h2>
        <input required placeholder='Proje Adı' className="inputItem" type="text" name="name" id="name" value={name} onChange={(e)=>handleInput(e)}/>
        <textarea required placeholder='Proje Açıklaması' className="inputItem" name="requirements" id="requirements" cols="30" rows="10" value={requirements} onChange={(e)=>handleInput(e)}/>
        <button type='submit'>Oluştur</button>
    </form>
    </>
  )
}

export default CreateProject