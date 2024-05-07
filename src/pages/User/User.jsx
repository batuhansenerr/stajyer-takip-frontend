import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './User.css'
import ProjectListItem from '../../component/Project/ProjectListItem'
import UserListItem from '../../component/User/UserListItem'
import THeader from '../../component/TurksatHeader/THeader'

const User = () => {

    const {id} = useParams()
    
    const [user, setUser] = useState({
        name: "",
        surname: "",
        username:"",
        id: "",
        password: "",
        projects: [],
        comments: [],
        authorities: []
    })

    const [mentorInterns, setmentorInterns] = useState([{
        name: "",
        surname: "",
        username:"",
        id: "",
        password: "",
        projects: [],
        comments: [],
        authorities: []
    }])

    const [filteredInterns, setFilteredInterns] = useState([{
        name: "",
        surname: "",
        username:"",
        id: "",
        password: "",
        projects: [],
        comments: [],
        authorities: []
    }])

    const [interns, setInterns] = useState([{
        name: "",
        surname: "",
        username:"",
        id: "",
        password: "",
        projects: [],
        comments: [],
        authorities: []
    }])

    const [isMentor, setIsMentor] = useState() 
    const [isAdmin, setIsAdmin] = useState(false);

    const getUser = async() => {
        const token = localStorage.getItem("token")
        await axios.request({
            headers: {
                Authorization: `Bearer ${token}`
            },
            method : "GET",
            url: `http://localhost:8080/auth/user/${id}`
        }).then(response=>{
            setUser(response.data)
        })
    }

    const getMentorInterns = async() => {
        const token = localStorage.getItem("token")
        await axios.request({
            headers: {
                Authorization: `Bearer ${token}` 
            },method: "GET",
            url: `http://localhost:8080/intern/mentor/${id}`
        }).then(response=>{
            setmentorInterns(response.data)
        })
    }

    const getInterns = async() => {
        const token = localStorage.getItem("token")
        await axios.request({
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: "GET",
            url: `http://localhost:8080/intern`
        }).then(response=>{
            setInterns(response.data)
            console.log("all interns->", response.data);
        })
    }

    const [assignIntern, setAssignIntern] = useState({
        mentor_id: "",
        intern_id: ""
    })

    const assignInternToMentor = async() => {
        const token = localStorage.getItem("token")
        await axios.request({
            headers: {
                Authorization: `Bearer ${token}`
            },method: "POST",
            url: `http://localhost:8080/admin/assignInternToMentor`,
            data: assignIntern
        }).then(response=>{
            console.log(response.data);
        })
    }

    const [isEditing, setIsEditing] = useState(false);

    const handleCancelEdit = () => {
        setIsEditing(false);
    }

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleEditSave = () => {
        assignInternToMentor()
        setIsEditing(false)
    }

    const handleSearch = (query) => {
        const filtered = interns.filter(intern =>
            intern.name.toLowerCase().includes(query.toLowerCase()) ||
            intern.surname.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredInterns(filtered);
    }
    
    const handleSearchChange = (e) => {
        const query = e.target.value;
        handleSearch(query);
    }
    
    const handleInternSelect = (selectedIntern) => {
        const updatedAssignIntern = {
            intern_id: selectedIntern.id,
            mentor_id: user.id
        };
        setAssignIntern(updatedAssignIntern);            
        console.log("assign intern->:", assignIntern);
    }

    useEffect(()=>{
        getUser()
        getMentorInterns()
        getInterns()
        setFilteredInterns(interns)
    },[isEditing])

    useEffect(() => {
        const authRoles = localStorage.getItem("userRole");
        console.log(authRoles);
        if (user.authorities.includes("ROLE_MENTOR")) {
            setIsMentor(true);
        } else if (authRoles.includes("ROLE_ADMIN")) {
            setIsAdmin(true);
        }
    }, [user])
    

    const roles = user.authorities.map(role => role.split('_')[1]);

  return (
        <>
            <div className="general">
            <THeader/>
            <div className="major-y">
                <div className="top">
                    <div className="profilePhoto">
                        <img src="" alt="" />
                    </div>
                    <div className="details">
                        <div><h2>{user.name} {user.surname}</h2></div>
                        <div><h3>@{user.username}</h3></div>
                        <div>{roles.map((auth, index) => (
                                <h4 key={index}>- {auth}</h4>
                            ))}</div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="projects">
                    <h3>Projeler</h3>
                    {
                        user.projects.map((project, index) => (
                            <ProjectListItem key={index} project={project} />
                        ))
                    }
                    </div>
                    {isMentor ? 
                    (<div className="interns">
                        <h3>Stajyerler</h3>
                        {isAdmin ?
                        (<>
                        {!isEditing ?
                        (<button className='yesil' onClick={handleEditClick}>Stajyer Ata</button>):
                        (<>
                        <div className='asd'>
                        <div>
                            <input
                                    type="text"
                                    placeholder="Stajyer Ara..."
                                    onChange={handleSearchChange}
                            />
                        </div>
                        <div>
                            <select onChange={(e) => handleInternSelect(filteredInterns[e.target.value])}>
                                {filteredInterns.map((intern, index) => (
                                    <option key={index} value={index}>{intern.name} {intern.surname}</option>
                                ))}
                            </select>
                        </div>
                        </div>
                        <button className='yesil' onClick={handleEditSave}>Ekle</button>  
                        <button className='kirmizi' onClick={handleCancelEdit}>İptal Et</button>  
                        </>)
                        }
                        </>
                        )
                        :
                        (<></>)}
                        {
                            mentorInterns.map((intern, index) => (
                                <UserListItem user={intern} />
                            ))
                        }
                    </div>) : (<></>)}
                </div>
            </div>
            </div>
        </>
  )
}

export default User