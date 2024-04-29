import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './ProjectUsersCard.css'

const ProjectUsersCard = ({project_id}) => {

    const [mentors, setMentors] = useState([])
    const [interns, setInterns] = useState([])

    const getUserByRole = async(role) => {
        const token = localStorage.getItem("token")
        console.log("geldik de noldu");
        await axios.request({
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: "GET",
            url: `http://localhost:8080/project/${project_id}/${role}`
        }).then(response => {
            const userData = response.data;
            if(role==="mentor"){
                setMentors(userData)
            }else if(role==="intern"){
                setInterns(userData);
            }
        })
    }
    
    useEffect(()=>{
        console.log(project_id);
        getUserByRole("intern")
        getUserByRole("mentor")
    },[project_id])

  return (
    <>
        <div className="projectUsersCard">
            <div className="mentorSide">
                <div className="title">
                    Mentor
                    <div className="buttons"></div>
                </div>
                {
                    mentors.map((mentor, index)=>(
                        <div className="user">{mentor.name} {mentor.surname}</div>
                    ))
                }            </div>
            <div className="internSide">
                <div className="title">
                    Stajyerler
                    <div className="buttons">
                        <button className='ekle'>+</button>
                    </div>
                    </div>
                {
                    interns.map((intern, index)=>(
                        <div className="user">{intern.name} {intern.surname} <button className='sil'>x</button></div>
                    ))
                }
            </div>
        </div>
    </>
  )
}

export default ProjectUsersCard