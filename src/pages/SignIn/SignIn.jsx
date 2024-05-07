import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo  from "../../assets/img/logo.png"
import './SignIn.css'

const SignIn = () => {

let navigate = useNavigate()

const [user, setUser] = useState({
    username: "",
    password: ""
})

const handleInput = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
}

const { username, password } = user

const login = async(e) => {
    e.preventDefault()
    const request = await axios.post("http://localhost:8080/auth/login", user)
    if(request.status===200){
        console.log("log in ->", request);
        localStorage.setItem("token", request.data)
        navigate("/projects")
    }
}

  return (
    <>
        <form className='loginPageCard' onSubmit={(e)=>login(e)}>
        <div className="logo">
            <img src={logo} alt="" />
        </div>
        <div className="inputs">
            <div>
                <label htmlFor="username">Kullanıcı Adı: </label>
                <input type="text" id='username' name='username' required value={username} onChange={(e)=>handleInput(e)}/>
            </div>
            <div>
                <label htmlFor="password">Şifre: </label>
                <input type="password" id='password' name='password' required value={password} onChange={(e)=>handleInput(e)}/>
            </div>
            <button type='submit'>Giriş Yap</button>
        </div>
        </form>
    </>
  )
}

export default SignIn