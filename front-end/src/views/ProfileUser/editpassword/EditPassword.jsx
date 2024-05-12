import React, { useState } from 'react'
import AuthUser from '../../../api/AuthUser'
import { useNavigate } from 'react-router-dom';
import './EditPassword.css'
import Helmet from '../../../components/Hemlet/Hemlet'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPassword = () => {

    const [old_password, setold_password] = useState('')
    const [new_password, setnew_password] = useState('')
    const [confirm_password, setconfirm_password] = useState('')
    const { Axios, AdmingetToken } = AuthUser()
    const [error, seterror] = useState({})
    const navigate = useNavigate()

    const editPassword = async () => {

        const formdata = new FormData()
        formdata.append('old_password', old_password)
        formdata.append('new_password', new_password)
        formdata.append('confirm_password', confirm_password)

        await Axios.post(`${AdmingetToken() ? 'admin' : 'user'}/updatePassword`, formdata).then(response => {
        
            toast.success("Votre mot de passe a été changé avec succés")
            setTimeout(() => {
                navigate('/EditProfile')
            }, 3000);

        }).catch(err => {
            if (err.response.status === 401) {
                seterror({
                    ...error,
                    old_password: err.response.data.error,
                })
            }
            else {
                seterror(err.response.data.errors)

            }
        })
    }
    return (
        <>
            <Helmet title='edit mot de pass'>
                <section className='editpassword_section'>
                    <div className="content">
                        <div className="head">
                            <h3>Edit password</h3>
                        </div>
                        <div className="info"   >
                            <ul>
                                <li><label>Old password</label><div className='input-field'><input type="password" value={old_password} onChange={(e) => setold_password(e.target.value)} />
                                    {error.old_password && <span>{error.old_password}</span>}
                                </div>
                                </li>
                                <li><label>new password</label><div className='input-field'><input type="password" value={new_password} onChange={(e) => setnew_password(e.target.value)} />
                                    {error.new_password && <span>{error.new_password}</span>}
                                </div>
                                </li>
                                <li><label>confirm password</label><div className='input-field'><input type="password" value={confirm_password} onChange={(e) => setconfirm_password(e.target.value)} />
                                    {error.confirm_password && <span>{error.confirm_password}</span>}
                                </div>
                                </li>
                            </ul>
                            <button onClick={editPassword} className='btn2'>Edit password</button>
                        </div >

                    </div >
                </section >
                <ToastContainer />
            </Helmet>
        </>
    )
}

export default EditPassword