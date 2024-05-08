import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AuthUser() {
    const navigate = useNavigate()

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token')
        const Token = JSON.parse(tokenString)
        return Token
    }
    const usergetToken = () => {
        const tokenString = sessionStorage.getItem('token')
        const userToken = JSON.parse(tokenString)
        return userToken
    }
    const AdmingetToken = () => {
        const tokenString = sessionStorage.getItem('admin_token')
        const adminToken = JSON.parse(tokenString)
        return adminToken
    }

    const getUser = () => {
        const UserString = sessionStorage.getItem('user')
        const user_detail = JSON.parse(UserString)
        return user_detail
    }
    const getadmin = () => {
        const adminString = sessionStorage.getItem('admin')
        const admin_detail = JSON.parse(adminString)
        return admin_detail
    }

    const [token, settoken] = useState(getToken())
    const [user, setuser] = useState(getUser())
    const [admin, setadmin] = useState(getadmin())



    const saveTokenUser = (user, token) => {
        sessionStorage.setItem('token', JSON.stringify(token))
        sessionStorage.setItem('user', JSON.stringify(user))
        settoken(token)
        setuser(user)
        navigate('/')
    }
    const saveTokenAdmin = (admin, token) => {
        sessionStorage.setItem('admin_token', JSON.stringify(token))
        sessionStorage.setItem('admin', JSON.stringify(admin))
        settoken(token)
        setadmin(admin)
        navigate('/dashboard')
    }
    const saveToken = (token) => {
        sessionStorage.setItem('token', JSON.stringify(token))
        settoken(token)
    }
    const Axios = axios.create({
        baseURL: 'http://localhost:8000/api',
        headers: {
            "Content-type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        }
    })
    const logout = () => {
        sessionStorage.clear();
        navigate('/role');
    }
    return {
        saveTokenAdmin,
        saveTokenUser,
        token,
        user,
        admin,
        getToken,
        logout,
        Axios,
        AdmingetToken,
        usergetToken,
        saveToken
    }
} 