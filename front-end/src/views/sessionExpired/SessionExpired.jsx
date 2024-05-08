import React from 'react'
import session_img from '../../assets/Images/icons/loading_6250505.png'
import './SessionExpired.css'
import { useNavigate } from 'react-router-dom'

const SessionExpired = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="session_expired">
                <div className="content">
                    <img src={session_img} alt="" />
                    <p>Your session has expired. Please log in again to continue.</p>
                    <div className='log'>
                        <button className='btn2' onClick={() => navigate('/role')}>Log In</button>
                    </div>
                </div>
            </div >
        </>
    )
}

export default SessionExpired