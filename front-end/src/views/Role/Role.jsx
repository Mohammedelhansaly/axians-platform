import React from 'react'
import UserIMG from '../../assets/Images/user.png'
import AdminIMG from '../../assets/Images/admin.png'
import './Role.css'
import { Link } from 'react-router-dom'

const Role = () => {
    return (
        <>
            <div className="role">
                <div className="role-items">
                    <Link to={'/admin/login'} className="item">
                        <div className="img">
                            <img src={AdminIMG} alt="" />
                        </div>
                        <span>Admin</span>
                    </Link>
                    <Link to={'/login'} className='item'>
                        <div className="img">
                            <img src={UserIMG} alt="" />
                        </div>
                        <span>User</span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Role