import { BrowserRouter, useNavigate, } from 'react-router-dom'
import './App.css'
import AuthUser from './api/AuthUser'
import { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Router from './Routers/Router'
import Footer from './components/Footer/Footer'
import FullLayout from './components/fullLayout/FullLayout'
import { jwtDecode } from "jwt-decode";
import SessionExpired from './views/sessionExpired/SessionExpired'


function App() {
  console.error = () => {}
  const { getToken, AdmingetToken } = AuthUser()
  const [isopen, setisopen] = useState(false)

  const navigate = useNavigate()
  useEffect(() => {
    
    if (getToken()) {
      const decodeToken = jwtDecode(getToken())
      const currentDate = Date.now() / 1000
      if (decodeToken.exp < currentDate) {
        navigate('/sessionExpired')
      }
    }
    else {
      navigate("/role");

    }
  }, [])
  return (
    <>
      <Router />
    </>
  )
}

export default App
