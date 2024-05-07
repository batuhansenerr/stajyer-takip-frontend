import React from 'react'
import { Link } from 'react-router-dom'

const UserListItem = ({user}) => {
    const roles = user.authorities.map(role => role.split('_')[1]).join(", ");
    return (
        <>
            <div className="card">
                <Link to={`/user/${user.id}`}>
                    <div className="major-x">
                        <div className="title"><h3>{user.name} {user.surname}</h3></div>
                        {/*<img src="" alt=""/>*/}
                    </div>
                </Link>
                <div className="details">
                    <div className="detail-item">@{user.username}</div>
                    <div className="detail-item">{roles}</div>
                </div>
            </div>
        </>
    )
}

export default UserListItem
