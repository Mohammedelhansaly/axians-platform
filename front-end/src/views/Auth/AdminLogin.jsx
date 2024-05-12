import React, { useState } from 'react'
import './Auth.css'
import LeftSide from './LeftSide'
import { Link } from 'react-router-dom'
import Helmet from '../../components/Hemlet/Hemlet'
import AuthUser from '../../api/AuthUser'
const AdminLogin = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [error, seterror] = useState({})

  const { Axios, saveTokenAdmin, saveToken } = AuthUser()
  const handleSubmit = () => {
    Axios.post('admin/login', { email, password }).then(res => {
      saveTokenAdmin(res.data.admin, res.data.access_token)
      saveToken(res.data.access_token)
    }).catch(e => {
      if (e.response.status === 401) {
        seterror({
          ...error,
          email: e.response.data.error,
          password: ''

        })
      }
      else {
        console.log(e);
        seterror(e.response.data.errors)
      }
    })
  }
  return (
    <>
      <Helmet title="login">
        <div className="auth">
          <div className="content">
            <div className="left">
              <div class="loginForm">
                <h2 className='header'>Se connecter</h2>
                <p>Entrez votre e-mail et votre mot de passe ci-dessous pour vous connecter à votre compte </p>
                <div>
                  <div className="input-field">
                    <label htmlFor="">email</label>
                    <input type="text"
                      placeholder="Entrer votre Email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                    {error.email && <span>{error.email}</span>}


                  </div>
                  <div className="input-field">
                    <label htmlFor="">Password</label>
                    <input type="password"
                      placeholder="Entrer votre Mot de pass"
                      value={password}
                      onChange={(e) => setpassword(e.target.value) }
                    />
                    {error.password && <span>{error.password}</span>}

                  </div>

                  <button className='btn2' onClick={handleSubmit}  >Se connecter</button>
                  <div className="link">

                  </div>
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

export default AdminLogin