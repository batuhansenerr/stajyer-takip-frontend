import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

    let navigate = useNavigate()

    const [user, setUser] = useState({
        name: "",
        surname: "",
        username: "",
        password: "",
        authorities: []
    })

    const {name, surname, username, password, authorities} = user

    const testLog = (e) => {
        e.preventDefault()
        console.log(user);
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
    
        if (name === 'authorities') {
            setUser({...user, authorities: [value]});
        } else {
            setUser({...user, [name]: value});
        }
    }

    const saveUser = async(e) => {
        e.preventDefault()
        await axios.post("http://localhost:8080/auth/register", user)
        navigate("/")
    } 

  return (
    <>
        <form onSubmit={(e)=>saveUser(e)}>
        <div>
            <label htmlFor="name">Ad </label>
            <input type="text" id='name' name='name' required value={name} onChange={(e)=>handleInput(e)}/>
        </div>
        <div>
            <label htmlFor="susername">Soyad </label>
            <input type="text" id='surname' name='surname' required value={surname} onChange={(e)=>handleInput(e)}/>
        </div>
        <div>
            <label htmlFor="username">Kullanıcı Adı </label>
            <input type="text" id='username' name='username' required value={username} onChange={(e)=>handleInput(e)}/>
        </div>
        <div>
            <label htmlFor="password">Şifre </label>
            <input type="password" id='password' name='password' required value={password} onChange={(e)=>handleInput(e)}/>
        </div>
        <div>
            <label htmlFor="stajyerButton">Stajyer</label>
            <input type="radio" id='stajyerButton' name='authorities' value="ROLE_INTERN" onChange={(e)=>handleInput(e)}/>

            <label htmlFor="mentörButton">Mentör</label>
            <input type="radio" id='mentörButton' name='authorities' value="ROLE_MENTOR" onChange={(e)=>handleInput(e)}/>
        </div>
        <button type='submit'>Kayıt Ekle</button>
        </form>
    </>
  )
}

export default SignUp