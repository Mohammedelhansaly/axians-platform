import React, { useEffect, useRef, useState } from 'react'
import logo1 from '../../assets/Images/logo/Logo_Axians.png'
import logo2 from '../../assets/Images/logo/Logo_Axians.webp'

import { Link, NavLink, useNavigate } from 'react-router-dom'
import avatar from '../../assets/Images/avatars/300-2.jpg'
import './Header.css'
import HeadTitle from '../HeadTitle/HeadTitle'
import AuthUser from '../../api/AuthUser'
import TimeAgo from '../TimeAgo/TimeAgo'

const Header = () => {
    const navigate = useNavigate()
    const [userDetails, setuserDetails] = useState({})
    const [adminDetails, setadminDetails] = useState({})
    const [notification, setnotification] = useState([])
    const [notificationdata, setnotificationdata] = useState([])



    const { logout, token, Axios, AdmingetToken } = AuthUser()
    const logoutUser = () => {
        if (token != undefined) {
            logout();
        }
    }

    const fetchuserData = async () => {
        try {
            const res = await Axios.post('/user/me');
            setuserDetails(res.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchadminData = async () => {
        try {
            const res = await Axios.post('/admin/me');
            setadminDetails(res.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchnotification = async () => {
        try {
           
            const res = await Axios.get(`/${AdmingetToken() ? 'admin' : 'user'}/notify`);
            console.log(res.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getnotification = async () => {
        try {
            const res = await Axios.get(`/${AdmingetToken() ? 'admin' : 'user'}/notification`);
            setnotification(res.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        fetchuserData();
        fetchadminData()
        fetchnotification()
        getnotification()
    }, []);

    //add active class to navbar when scrolling
    const [scrolling, setscrolling] = useState(false)
    const nav = useRef()
    window.addEventListener('scroll', () => {
        if (window.scrollY > 150 && document.documentElement.scrollTop > 150) {
            nav.current.classList.add('active')
            setscrolling(true)
        }
        else {
            nav.current.classList.remove('active')
            setscrolling(false)
        }
    })

    // search function and add search items to recent searches list
    const [search, setsearch] = useState('')
    const [project, setprojects] = useState([])
    const [searchlist, setsearchlist] = useState([])

    const getDATA = async () => {
        await Axios.get(`/${AdmingetToken() ? 'admin' : 'user'}/mesprojet`).then((res) => {
            setprojects(res.data)
        })
            .catch(error => {
                console.log(error)
            })
    }
    useEffect(() => {
        getDATA()
    }, []);



    const searchProjects = (e) => {
        const wordEnter = e.target.value.trim()
        setsearch(wordEnter)

        const searched = project.filter(project =>
            project.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
        if (wordEnter === '') {
            setsearchlist([])
        }
        else {
            setsearchlist(searched)
        }
    }



    const [notifyopen, setnotifyopen] = useState(false)

    const togglenotify = () => {
        setnotifyopen(!notifyopen)
        setprofilopen(false)


    }

    const [profilopen, setprofilopen] = useState(false)

    const toogleprofil = () => {
        setprofilopen(!profilopen)
        setnotifyopen(false)

    }





    return (
        <>
            <header>
                <nav ref={nav}>
                    <div className="content">
                        <div className="brand">
                            <img src={scrolling ? logo2 : logo1} alt="" />
                        </div>
                        <div className="menu-links">
                            <ul>
                                {
                                    AdmingetToken() ? <NavLink className={navlink => navlink.isActive ? 'active' : ''} to={'/dashboard'}><span>Dashboard</span></NavLink>
                                        : null
                                }
                                <NavLink className={navlink => navlink.isActive ? 'active' : ''} to={'/MesProjets'}><span>Mes Projets</span></NavLink>

                            </ul>
                        </div>
                        <div className="toolbar">
                            <ul className='list'>

                                <li>
                                    <div className="search-bar">
                                        <i class="ri-search-2-line"></i>
                                        <input type='text' placeholder='chercher par nom de projet' value={search} onChange={searchProjects} />
                                    </div>
                                    {
                                        searchlist.length !== 0 && (
                                            <div className='search-items'>
                                                {
                                                    searchlist.map(project => (
                                                        <Link to={`/ListeEquipements/${project.id}`}>{project.name}</Link>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }

                                </li>
                                <li>
                                    <div className='tool notify' onClick={togglenotify}>
                                        <i class="ri-notification-2-line"></i>
                                        <span className='count'>{notification.length}</span>

                                    </div>
                                    {
                                        notifyopen &&

                                        <div className='notification'>
                                            <h2>Notifications</h2>
                                            <ul className='list-notication'>
                                                {
                                                    notification.length > 0 ?
                                                        notification.map(e => {
                                                            return (
                                                                <>
                                                                    <div className='notification-item'>
                                                                        <Link to={`/ListeEquipements/${e.data.project_id}`}>
                                                                            <p>Nom de Projet : <span>{e.data.project_name}</span></p>
                                                                            <p>Message  : <span>{e.data.message}</span></p>
                                                                            <TimeAgo createdAt={e.created_at} />
                                                                        </Link>
                                                                    </div>
                                                                </>
                                                            )
                                                        })
                                                        : <h4 style={{ textAlign: "center" }}>aucun notification trovee  pour le moment.</h4>

                                                }
                                            </ul>
                                        </div>
                                    }

                                </li>
                                <li><div className='tool profil-icon' onClick={toogleprofil}><img src={`${Axios.defaults.backURL}/img/${AdmingetToken() ? adminDetails.imageUser : userDetails.imageUser}`} alt="" className='user-profile' /></div>
                                    {
                                        profilopen &&

                                        <div className="profile">
                                            <div className="top">
                                                <div className="left">
                                                    <img src={`{Axios.defaults.backURL}/img/${AdmingetToken() ? adminDetails.imageUser : userDetails.imageUser}`} alt="" />
                                                </div>
                                                <div className="right">
                                                    <span>{AdmingetToken() ? adminDetails.name : userDetails.name}</span>
                                                    <p>{AdmingetToken() ? adminDetails.email : userDetails.email}</p>
                                                </div>
                                            </div>
                                            <div className="bottom">
                                                <ul>
                                                    <li><Link to={'/profile'}>Profile</Link></li>
                                                    <li onClick={logoutUser}>Se deconnecter</li>
                                                </ul>
                                            </div>
                                        </div>
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <HeadTitle />
            </header>
        </>
    )
}

export default Header