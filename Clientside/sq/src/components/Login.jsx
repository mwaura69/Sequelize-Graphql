import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useAuth} from '../pages/AuthProvider'


const Login = () => {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [input, setInput] = useState({
        email: '',
        password: ''
    })
    const loginTo = () => {
        axios.post('http://localhost:5001/login/user', input)
        .then((res) => {
            const { token } = res.data
            console.log(res.data)
            setInput(res.data)
            setInput({
                email: '',
                password: ''
            })
            login(token)
            console.log(token)
            if(res.status === 200) {
                navigate('/home')
            } else {
                navigate('/')
            }
        })
        .catch((err) => {
            console.log(err.response.data)
        })
    }
    return (
        <>
            <div>
                <label>Email: <input value={input.email} placeholder='email' type='email' onChange={(e) => setInput({...input, email: e.target.value })} /></label><br/>
                <label>Password: <input value={input.password} placeholder='password' type='password' onChange={(e) => setInput({ ...input, password: e.target.value})} /></label><br/>
                <button onClick={loginTo}>Login</button>
            </div>
        </>
    )
}


export default Login