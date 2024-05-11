import React, { useEffect, useState } from 'react'
import './Profile.css'
import { Link } from 'react-router-dom'
import Helmet from '../../../components/Hemlet/Hemlet'
import AuthUser from '../../../api/AuthUser'
import Loader from '../../../components/Loader/Loader'

const Profile = () => {
  const { Axios, AdmingetToken } = AuthUser()
  const [userDetails, setuserDetails] = useState({})
  const [adminDetails, setadminDetails] = useState({})
  const [lodding, setlodding] = useState(false)
  useEffect(() => {
    const fetchuserData = async () => {
      try {
        const res = await Axios.post('/user/me');
        setuserDetails(res.data)
        setlodding(true)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchadminData = async () => {
      try {
        const res = await Axios.post('/admin/me');
        setadminDetails(res.data)
        setlodding(true)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchuserData();
    fetchadminData()
  }, []);

  return (
    <>

      <Helmet title="profile">
        {
          lodding ?

            <section className="profile_section">
              <div className="content">
                <div className="head">
                  <h3>Profile</h3>
                  <button className='btn2'><Link to={'/EditProfile'}>Edit Profile</Link></button>
                </div>
                <div className="info">
                  <ul>
                    <li><span>Profile</span><img src={`/img/${AdmingetToken() ? adminDetails.imageUser : userDetails.imageUser}`} alt="" /></li>
                    <li><span>Nom</span><p>{AdmingetToken() ? adminDetails.name : userDetails.name}</p></li>
                    <li><span>Email</span><p>{AdmingetToken() ? adminDetails.email : userDetails.email}</p></li>
                  </ul>
                </div>

              </div>
            </section>
            : <Loader />
        }
      </Helmet>
    </>
  )
}

export default Profile