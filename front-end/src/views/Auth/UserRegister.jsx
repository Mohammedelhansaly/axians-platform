import React, { useState } from 'react'
import './Auth.css'
import LeftSide from './LeftSide'
import Helmet from '../../components/Hemlet/Hemlet'
import AuthUser from '../../api/AuthUser'
import { useNavigate } from 'react-router-dom'

const UserRegister = () => {

  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const { Axios } = AuthUser()
  const navigate = useNavigate()
  const [error, seterror] = useState({})

  const hundleSubmit = () => {
    Axios.post('user/register', { name, email, password }).then(res => {
      navigate('/login')
    }).catch(e => {
      seterror(e.response.data.errors)
    })
  }
  return (
    <>
      <Helmet title="register">
        <div className="auth">
          <div className="content">
            <div className="left">
              <div class="loginForm">
                <h2 className='header'>Se connecter</h2>
                <p>Entrez votre e-mail et votre mot de passe ci-dessous pour vous connecter à votre compte </p>
                <div>
                  <div className="input-field">
                    <label htmlFor="">Username</label>
                    <input type="text"
                      placeholder="Enter your email"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                    />
                    {error.name && <span>{error.name}</span>}


                  </div>
                  <div className="input-field">
                    <label htmlFor="">Email</label>
                    <input type="text"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                    {error.email && <span>{error.email}</span>}

                  </div>
                  <div className="input-field">
                    <label htmlFor="">Password</label>
                    <input type="password"
                      placeholder="Enter your email"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                    />
                    {error.password && <span>{error.password}</span>}

                  </div>

                  <button className='btn2' onClick={hundleSubmit} >Se connecter</button>
                </div>
              </div>
            </div>
            <LeftSide />
          </div>
        </div>
      </Helmet>
    </>
  )
}

export default UserRegister