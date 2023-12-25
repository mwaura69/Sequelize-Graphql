import axios from 'axios'
import { useState, useCallback, useEffect} from 'react'
import {useAuth} from './AuthProvider'


const Home = () => {
    const [get, setGet] = useState([])
    const { token } = useAuth()
    const getDetails = useCallback(() => {
        if(token) {
            axios.get('http://localhost:5001/get/users', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setGet(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }, [])
    useEffect(() => {
        getDetails()
    }, [getDetails])
    return (
        <>
            <div>
            {/* {get && get.map(({ country, email, firstname, id, lastname }) => (
                    <div key={id}>
                        <p>firstname: {firstname}</p>
                        <p>lastname: {lastname}</p>
                        <p>email: {email}</p>
                        <p>country: {country}</p>
                    </div>
                ))} */}
                <p>firstname: {get.firstname}</p>
                <p>lastname: {get.lastname}</p>
                <p>email: {get.email}</p>
                <p>country: {get.country}</p>
                
            </div>
        </>
    )
}

export default Home