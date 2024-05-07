import React from 'react'
import { FaHome } from "react-icons/fa";
import { GoProjectRoadmap } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import logo  from "../../assets/img/logo.png"
import './TurksatHeader.css'

const THeader = () => {
  return (
        <div className="header">
            <div className="logo">
                <img src={logo}  />
            </div>
            <div className="navigation">
                <ul>
                    <li><a href=""><FaHome /></a></li>
                    <li><a href=""><GoProjectRoadmap /></a></li>
                    <li><a href=""><CgProfile /></a></li>
                </ul>
            </div>
        </div>
)
}

export default THeader