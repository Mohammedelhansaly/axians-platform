import React from 'react'
import Header from '../Header/Header'
import { Outlet, Routes } from 'react-router-dom'
import './FullLayout.css'
import Footer from '../Footer/Footer'
import Router from '../../Routers/Router'

const FullLayout = () => {
    return (
        <>
            
                <Header />
                <div className="container">
                    <Outlet />
                </div>
                <Footer />
        </>
    )
}

export default FullLayout