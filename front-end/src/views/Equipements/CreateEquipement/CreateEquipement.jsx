import React, { useState } from 'react'
import './CreateEquipement.css'
import { useParams } from 'react-router-dom'
import AuthUser from '../../../api/AuthUser'

const CreateEquipement = ({ isOpen, isclose }) => {
    const { id } = useParams()
    const { Axios ,AdmingetToken} = AuthUser()
    console.log(id)
    const [reference, setreference] = useState('')
    const [licence, setlicence] = useState('')
    const [serialnumber, setserialnumber] = useState('')
    const [startDate, setstartDate] = useState('')
    const [endDate, setendDate] = useState('')
    const [error, seterror] = useState({})
    const AddData = async () => {
        await Axios.post(`/${AdmingetToken() ? 'admin' : 'user'}/mesprojet/${id}/equipemets/create`, {
            reference,
            licence,
            serialnumber,
            startDate,
            endDate
        }).then(res => {
            window.location.reload()
        }).catch(err => {
            seterror(err.response.data.errors);
        })

    }
    // condition open or close
    if (!isOpen) {
        return null
    }
    return (
        <>

            <div className="Create_equipement">
                <div className="form-item">
                    <div className="header">
                        <h3>Noveau Equipement</h3>
                        <div className="close" onClick={isclose}>
                            <i class="ri-close-fill"></i>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="form">

                            <div className="input-field">
                                <label>Nom de equipement </label>
                                <input type="text" placeholder="enter le nom"
                                    value={reference}
                                    onChange={(e) => setreference(e.target.value)}
                                />
                                {error.reference && <span>{error.reference}</span>}

                            </div>

                            <div className="input-field">
                                <label>description </label>
                                <input type="text" placeholder="enter le nom"
                                    value={licence}
                                    onChange={(e) => setlicence(e.target.value)}
                                />
                                {error.licence && <span>{error.licence}</span>}

                            </div>
                            <div className="field-line">
                                <div className="input-field">
                                    <label>date de debut </label>
                                    <input type="date" placeholder="enter la date"
                                        value={startDate}
                                        onChange={(e) => setstartDate(e.target.value)}
                                    />
                                    {error.startDate && <span>{error.startDate}</span>}

                                </div>

                                <div className="input-field">
                                    <label>date  de fin </label>
                                    <input type="date" placeholder="enter la date"
                                        value={endDate}
                                        onChange={(e) => setendDate(e.target.value)}
                                    />
                                    {error.endDate && <span>{error.endDate}</span>}

                                </div>
                            </div>
                            <div className="input-field">
                                <label>numero de serie  </label>
                                <input type="text" placeholder="enter le nom"
                                    value={serialnumber}
                                    onChange={(e) => setserialnumber(e.target.value)}
                                />
                                {error.serialnumber && <span>{error.serialnumber}</span>}

                            </div>
                            <button className='btn2' onClick={AddData}>Creer Equipement</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CreateEquipement