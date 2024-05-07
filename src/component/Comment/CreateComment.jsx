import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './CreateComment.css'

const CreateComment = () => {

    const {id} = useParams()
    const navigate = useNavigate()

    const [newcomment, setComment] = useState({
        comment: "",
        project_id: id
    })

    const { comment } = newcomment

    const createComment = async(e)=>{
        e.preventDefault()
        const token = localStorage.getItem("token")

        console.log(newcomment);

        await axios.request({
            headers:{
                Authorization: `Bearer ${token}`
            },
            method: "POST",
            url: "http://localhost:8080/comment/add",
            data: newcomment
        }).then(response=>{
            navigate(`/project/${id}`)
        })
    }

    const handleInput = (e)=>{
        setComment({...newcomment, [e.target.name]:e.target.value})
    }

  return (
    <>
        
        <form className="createCommentCard" onSubmit={(e)=>createComment(e)}>
            <h2>Yorum Yap</h2>
            <textarea className="inputItem" id='comment' placeholder='asd..' name='comment' required value={comment} onChange={(e)=>handleInput(e)}/>
            <button type='submit'>Yorum Yap</button>
        </form>
    </>
  )
}

export default CreateComment