import Home from './Home'
import Login from '../components/Login'
import Register from '../components/Register'
import { useAuth } from './AuthProvider'
import { Routes, Route } from 'react-router-dom'

const ProtectPage = (props) => {
    const { token } = useAuth()
    return (
        <Routes>
            {token ? (
                <Route path='/home*' element={<Home />} />
            ) : (
                <>
                    <Route path='/' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </>
            )}
        </Routes>

    )
}

export default ProtectPage