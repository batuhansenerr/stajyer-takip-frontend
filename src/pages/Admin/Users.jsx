import React, { useEffect, useState } from 'react'
import ProfileCard from '../../component/Profile/ProfileCard'
import axios from 'axios'
import UserListItem from '../../component/User/UserListItem'
import THeader from '../../component/TurksatHeader/THeader'
import { Pagination } from '@mui/material'

const Users = () => {
    const [users, setUsers] = useState([{
        name: "",
        surname: "",
        id: "",
        password: "",
        projects: [],
        comments: [],
        authorities: []
    }]);

    const [user, setUser] = useState({
        name: "",
        surname: "",
        id: "",
        password: "",
        projects: [],
        comments: [],
        authorities: []
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        getUser();
        getUsers();
    }, []);

    const getUsers = async () => {
        const token = localStorage.getItem("token");
        await axios.request({
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: "GET",
            url: `http://localhost:8080/admin/users`
        }).then(response => {
            setUsers(response.data);
        });
    };

    const getUser = async () => {
        const token = localStorage.getItem("token");
        await axios.request({
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: "GET",
            url: `http://localhost:8080/auth/profile`
        }).then(response => {
            setUser(response.data);
            localStorage.setItem("userRole", response.data.authorities);
            localStorage.setItem("username", response.data.username);
        });
    };

    const usersPerPage = 4;
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const renderUsers = currentUsers.map((user, index) => (
        <UserListItem key={index} user={user} />
    ));

    const paginate = (event, pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <THeader />
            <div className="major-y">
                <ProfileCard user={user} />
                <div className='projectlist'>
                    <br />
                    <h3>Kullanıcılar</h3>
                    <br />
                    <div className="project-filter">
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder='Kullanıcı Adı'
                            value={searchText}
                            onChange={e => setSearchText(e.target.value)}
                        />
                        <button><a href={`/register`}>Kullanıcı Ekle</a></button>
                    </div>
                    {renderUsers}
                    <Pagination
                        count={Math.ceil(users.length / usersPerPage)}
                        page={currentPage}
                        onChange={paginate}
                        color="primary"
                    />
                </div>
            </div>
        </>
    );
};

export default Users;
