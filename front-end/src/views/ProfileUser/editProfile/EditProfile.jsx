import React, { useEffect, useRef, useState } from 'react'
import './EditProfile.css'
import Helmet from '../../../components/Hemlet/Hemlet'
import AuthUser from '../../../api/AuthUser'
import Loader from '../../../components/Loader/Loader'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfile = () => {
  const { Axios, AdmingetToken } = AuthUser()
  const [userDetails, setuserDetails] = useState({})
  const [adminDetails, setadminDetails] = useState({})
  const [imgfile, setimgfile] = useState()
  const [previewImage, setPreviewImage] = useState()
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [lodding, setlodding] = useState(false)
  const [error, seterror] = useState({})


  useEffect(() => {
    const fetchuserData = async () => {
      try {
        const res = await Axios.post('/user/me');
        setuserDetails(res.data)
        setimgfile(res.data.imageUser)
        setname(res.data.name)
        setemail(res.data.email)
        setlodding(true)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchadminData = async () => {
      try {
        const res = await Axios.post('/admin/me');
        setadminDetails(res.data)
        setimgfile(res.data.imageUser)
        setname(res.data.name)
        setemail(res.data.email)
        setlodding(true)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchuserData();
    fetchadminData()
  }, []);

  // upload profile image
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setimgfile(file);

    const reader = new FileReader();
    reader.onload = function (e) {
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  //update profile data
  const updateProfileImage = async () => {
    try {
      const formData = new FormData();
      formData.append('imageUser', imgfile);
      formData.append('name', name);
      formData.append('email', email);

      const response = await Axios.post(`${AdmingetToken() ? 'admin' : 'user'}/updateProfile`, formData);
      toast.success("Votre Profile a été mis à jour avec succés")
      setTimeout(() => {
        window.location.reload()
      }, 3000);
    } catch (error) {
      seterror(error.response.data.errors)
    }
  }

  return (
    <Helmet title="edit profile">
      {
        lodding ?

          <section className='editProfile_section'>
            <div className="content">
              <div className="head">
                <h3>Edit Profile</h3>
              </div>
              <div className="info"   >
                <ul>
                  <li><p>Profile</p>
                    <div class="profile-pic">
                      <label class="-label" for="file">
                        <i class="ri-camera-line"></i>
                      </label>
                      <input accept='image/*' id="file" type="file" onChange={handleFileUpload} />
                      {

                        previewImage
                          ? <img src={previewImage} alt="" width={200} id='output' />
                          : <img src={`${Axios.defaults.backURL}/img/${imgfile}`} alt="" width={200} id='output' />

                      }
                    </div></li>
                  <li><p>Nom</p><div className='input-field'><input type="text" value={name} onChange={(e) => setname(e.target.value)} />
                    {error.name && <span>{error.name}</span>}
                  </div>
                  </li>

                  <li><p>Email</p> <div className='input-field'><input disabled type="text" value={email} onChange={(e) => setemail(e.target.value)} />
                    {error.email && <span>{error.email}</span>}
                  </div>
                  </li>
                </ul>
                <button onClick={updateProfileImage} className='btn2'>Edit Profile</button>

              </div>
              <Link className='editPassword' to={'/Editpassword'} >Edit password</Link>

            </div>
          </section >
          : <Loader />
      }
      <ToastContainer />
    </Helmet >
  )
}

export default EditProfile