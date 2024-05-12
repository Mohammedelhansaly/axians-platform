import React, { useEffect, useState } from 'react'
import './UpdateProject.css'
import axios from 'axios'
import AuthUser from '../../../api/AuthUser'
import { ToastContainer, toast } from 'react-toastify';
const UpdateProject = ({ isOpen, isclose, projectId }) => {

    const [name, setname] = useState('')
    const [client, setclient] = useState('')
    const [description, setdescription] = useState('')
    const [error, seterror] = useState({})

    const { Axios, AdmingetToken } = AuthUser()
    const GetDATAById = async () => {
        try {
            const res = await Axios.get(`/${AdmingetToken() ? 'admin' : 'user'}/mesprojet/edit/${projectId}`)
            setname(res.data.name);
            setclient(res.data.client);
            setdescription(res.data.description);

        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        GetDATAById()
    }, [projectId])
    const UpdateDATA = async () => {

        await Axios.post(`/${AdmingetToken() ? 'admin' : 'user'}/mesprojet/update/${projectId}`, {
            'name': name,
            'client': client,
            'description': description,
        }).then(res => {
        toast.success("Le projet a été modifié avec succés")
        setTimeout(() => {
            window.location.reload()
        }, 3000);
        }).catch(error => {
            seterror(error.response.data.errors)
        })

    }
    if (!isOpen) {
        return null
    }
    // Get the name of the current country from local storage and store it in a variable

    const [city, setCity] = useState([])
    const fetchCountries = async () => {
        let response = await axios.post("https://countriesnow.space/api/v0.1/countries/cities", {
            country: 'Morocco'
        })
        setCity(response.data.data)

    }

    useEffect(() => {
        fetchCountries()
    }, [])

    if (!isOpen) {
        return null;
    }
    return (
        <>
            <div className="Update_project">
                <div className="form-item">
                    <div className="top">
                        <h3>edit Projet</h3>
                        <div className="close" onClick={isclose}>
                            <i class="ri-close-fill"></i>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="form">

                            <div className="input-field">
                                <label>Nom de projet </label>
                                <input type="text" placeholder="enter le nom"
                                    value={name}
                                    onChange={e => setname(e.target.value)}
                                />
                                {error.name && <span>{error.name}</span>}

                            </div>
                            <div className="input-field">
                                <label htmlFor="name" >Site </label>
                                <select name="" id="" value={client}
                                    onChange={e => setclient(e.target.value)} >
                                    <option value="" >Choisir  un site...</option>
                                    {city.map((city) => (
                                        <option key={`${city}`} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                                {error.client && <span>{error.client}</span>}

                            </div>
                            <div className="input-field">
                                <label>description </label>
                                <textarea name="" id="" cols="30" rows="5"
                                    placeholder='entrez la description'
                                    value={description}
                                    onChange={e => setdescription(e.target.value)}
                                ></textarea>
                                {error.description && <span>{error.description}</span>}

                            </div>
                            <button className='btn2' onClick={UpdateDATA}>edit Projet</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}



export default UpdateProject