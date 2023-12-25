import './App.css'
import ProtectPage from './pages/ProtectPage'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import {AuthProvider} from './pages/AuthProvider'

const App = () => {
  return (
    <>
      <div>
        <AuthProvider>
          <ProtectPage>
            <Routes>
              <Route path='/home*' element={<ProtectPage element={<Home />}/>} />
            </Routes>
          </ProtectPage>
        </AuthProvider>
      </div>
    </>
  )
}

export default App