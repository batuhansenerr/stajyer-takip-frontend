import React, { useEffect, useState } from 'react'
import './ProjectListItem.css'
import { Link, useNavigate } from 'react-router-dom'


const ProjectListItem = ({project}) => {

    const navigate = useNavigate()
    const formattedInitialDate = new Date(project.initialDate).toLocaleDateString();


  return (
    <>
        <div className="card">
            <Link to={`/project/${project.id}`}>
            <div className="major-x">
                <div className="title"><h3>{project.name}</h3></div>
                {/*<img src="" alt=""/>*/}
            </div>
            </Link>
            <div className="details">
                <div className="detail-item">Başlangıç Tarihi: {formattedInitialDate}</div>                                
                <div className="detail-item">Proje Durumu: {project.projectStatus}</div>                                
                <div className="detail-item">Proje Puanı: {project.score}</div>                                
            </div>
        </div>
    </>
  )
}

export default ProjectListItem