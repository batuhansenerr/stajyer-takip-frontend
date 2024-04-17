import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
        console.log("girdik", request);
        localStorage.setItem("token", request.data)
    }
}

  return (
    <>
        <form onSubmit={(e)=>login(e)}>
        <div>
            <label htmlFor="username">Kullanıcı Adı </label>
            <input type="text" id='username' name='username' required value={username} onChange={(e)=>handleInput(e)}/>
        </div>
        <div>
            <label htmlFor="password">Şifre </label>
            <input type="password" id='password' name='password' required value={password} onChange={(e)=>handleInput(e)}/>
        </div>
        <button type='submit'>Giriş Yap</button>
        </form>
    </>
  )
}

export default SignIn