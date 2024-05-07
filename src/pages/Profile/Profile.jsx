import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectListItem from '../../component/Project/ProjectListItem'
import './Profile.css'
import ProfileCard from '../../component/Profile/ProfileCard'
import THeader from '../../component/TurksatHeader/THeader'
import Pagination from '@mui/material/Pagination';

const Profile = () => {
    const [user, setUser] = useState({
        name: "",
        surname: "",
        id: "",
        password: "",
        projects: [],
        comments: [],
        authorities: []
    });

    const [isMentor, setIsMentor] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const token = localStorage.getItem("token")
        await axios.request({
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: "GET",
            url: `http://localhost:8080/auth/profile`
        }).then(response => {
            setUser(response.data)
            localStorage.setItem("userRole", response.data.authorities)
            localStorage.setItem("username", response.data.username)
            if (response.data.authorities.includes("ROLE_MENTOR")) {
                setIsMentor(true)
            } else {
                setIsMentor(false)
            }
        })
    }

    const filterProjects = () => {
        let filteredProjects = user.projects;

        if (filterType === "completed") {
            filteredProjects = filteredProjects.filter(project => project.finishDate !== null);
        } else if (filterType === "ongoing") {
            filteredProjects = filteredProjects.filter(project => project.finishDate === null);
        }

        if (searchText) {
            filteredProjects = filteredProjects.filter(project =>
                project.name.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        return filteredProjects;
    };

    const projectsPerPage = 4;
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filterProjects().slice(indexOfFirstProject, indexOfLastProject);

    const renderProjects = currentProjects.map((project, index) => (
        <ProjectListItem key={index} project={project} />
    ));

    const paginate = (event, pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <THeader />
            <div className="major-y">
                <ProfileCard user={user} />
                <div className='projectlist'>
                    <br />
                    <h3>Projeler</h3>
                    <br />
                    <div className="project-filter">
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder='Proje Adı'
                            value={searchText}
                            onChange={e => setSearchText(e.target.value)}
                        />
                        <select
                            value={filterType}
                            onChange={e => setFilterType(e.target.value)}
                        >
                            <option value="all">Tümü</option>
                            <option value="completed">Tamamlanmış Projeler</option>
                            <option value="ongoing">Devam Eden Projeler</option>
                        </select>
                        {isMentor ? <button><a href={`/project/new`}>Yeni</a></button> : <></>}
                    </div>
                    {renderProjects}
                    <Pagination
                        count={Math.ceil(filterProjects().length / projectsPerPage)}
                        page={currentPage}
                        onChange={paginate}
                        color="primary"
                    />
                </div>
            </div>
        </>
    );
};

export default Profile;