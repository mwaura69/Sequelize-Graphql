import React, { useState} from 'react'
import axios from 'axios'


const Register = () => {
    const [input, setInput] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        password: '',
        setPassword: '',
        country: ''
    })

    const registerUser = () => {
        axios.post('http://localhost:5001/create/user', input)
        .then((res) => {
            console.log(res.data)
            setInput({
                firstname: '',
                lastname: '',
                phone: '',
                email: '',
                password: '',
                setPassword: '',
                country: ''
            })
        })
        .catch((err) => {
            console.log(err.response.data)
        })
    }

    return (
        <>
            <div>
                <label>Firstname: <input value={input.firstname} placeholder='firstname' type='text' onChange={(e) => setInput({...input, firstname: e.target.value})} /></label><br/>
                <label>Lastname: <input value={input.lastname} placeholder='lastname' type='text' onChange={(e) => setInput({...input, lastname: e.target.value})} /></label><br/>
                <label>Phonenumber: <input value={input.phone} placeholder='phone' type='number' onChange={(e) => setInput({...input, phone: e.target.value})} /></label><br/>
                <label>Email: <input value={input.email} placeholder='email' type='email' onChange={(e) => setInput({...input, email: e.target.value})} /></label><br/>
                <label>Password: <input value={input.password} placeholder='password' type='password' onChange={(e) => setInput({...input, password: e.target.value})} /></label><br/>
                <label>Confirm Password: <input value={input.setPassword} placeholder='setPassword' type='password' onChange={(e) => setInput({...input, setPassword: e.target.value})} /></label><br/>
                <label>Country: <input value={input.country} placeholder='country' type='text' onChange={(e) => setInput({...input, country: e.target.value})} /></label><br/>
                <button onClick={registerUser}>Register</button>
            </div>
        </>
    )
}

export default Register