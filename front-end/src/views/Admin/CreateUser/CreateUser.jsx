import React, { useState } from 'react'
import './CreateUser.css'
import AuthUser from '../../../api/AuthUser'

const CreateUser = ({ isOpen, isclose }) => {
    const [name, setname] = useState()
    const [email, setemail] = useState()
    const [error, seterror] = useState({})

    const { Axios } = AuthUser()
    const hundleSubmit = async () => {
        await Axios.post('admin/createUser', {
            name, email
        })
            .then(res => {
                window.location.reload()
            })
            .catch(err => seterror(err.response.data.errors))
    }
    if (!isOpen) {
        return null;
    }
    return (
        <>
            <div className="create_user">
                <div className="form-item">
                    <div className="top">
                        <h3>Nouveau Utilisateur</h3>
                        <div className="close" onClick={isclose}>
                            <i class="ri-close-fill"></i>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="form">

                            <div className="input-field">
                                <label>nom complet </label>
                                <input type="text" placeholder="enter le nom"
                                    value={name}
                                    onChange={(e) => setname(e.target.value)}
                                />
                                {error.name && <span>{error.name}</span>}

                            </div>
                            <div className="input-field">
                                <label>email  </label>
                                <input type="text" placeholder="enter l'email"
                                    value={email}
                                    onChange={(e) => setemail(e.target.value)}
                                />
                                {error.email && <span>{error.email}</span>}

                            </div>
                            <button className='btn2' onClick={hundleSubmit} >Ajouter</button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default CreateUser