import React, { useState } from 'react'
import AuthUser from '../../../api/AuthUser';
import importImg from '../../../assets/Images/icons/icons8-importer-le-fichier-64.png'
import * as XLSX from "xlsx";
import './ImportEquipement.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";
const ImportEquipement = ({ projectId, isOpen, isclose }) => {

    const { Axios, AdmingetToken } = AuthUser()
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(null)
    const [spinner , setSpinner] = useState(false)
    const [datax, setdatax] = useState([])

    const changeFile = (e) => {
        setFile(e.target.files[0])
        const selected = e.target.files[0]
        const reader = new FileReader();
        const customHeaders = ['reference', 'licence', 'startDate', 'endDate', 'serialnumber']
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const range = XLSX.utils.decode_range(sheet['!ref']);
            range.s.r = 4;
            setdatax(XLSX.utils.sheet_to_json(sheet, { range, header: customHeaders }));
            if (selected) {
                setFileName(selected.name)
            }
            else {
                setFileName('')
            }
        }
    }



     const importFile =  ()  => {
        console.log(datax)
        setSpinner(true)
         Axios.post(`${AdmingetToken() ? 'admin' : 'user'}/mesprojet/${projectId}/equipemets/import`, datax).then(res => {
            toast.success("Les equipements sont importés avec succes")
            setSpinner(false)
            setTimeout(() => {
                window.location.reload()
            }, 3000);
        }).catch(err => {
            setSpinner(false)
            alert(err.reponse.data.error)
        })
    };






    if (!isOpen) {
        return null
    }
    return (
        <>
            <div className="import_equipement">
                <div className="form-item">
                    <div className="header">
                        <h3>Importer Equipement</h3>
                        <div className="close" onClick={isclose}>
                            <i class="ri-close-fill"></i>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="form">

                            <label className="input-area" htmlFor="fileInput">
                                <h3>Importer le fichier </h3>
                                <img src={importImg} alt="" />
                                <input id="fileInput" type="file" onChange={changeFile} />
                                {fileName ? <p>file : {fileName}</p> : null}
                            </label>
                        </div>
                        {spinner ?                        <button className='btn2'><ClipLoader color="#ffffff" loading="true" size={20} aria-label="Loading Spinner"data-testid="loader" /></button>
 :  <button className='btn2' onClick={importFile}>Importer</button>}
                       
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default ImportEquipement