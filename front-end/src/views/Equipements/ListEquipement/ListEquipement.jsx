import React, { useEffect, useRef, useState } from 'react'
import './ListEquipement.css'
import { equipement } from '../../../assets/Database/Equipements'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CreateEquipement from '../CreateEquipement/CreateEquipement'
import UpdateEquipement from '../UpdateEquipement/UpdateEquipement'
import Helmet from '../../../components/Hemlet/Hemlet'
import AuthUser from '../../../api/AuthUser'
import Loader from '../../../components/Loader/Loader'
import ImportEquipement from '../ImportEquipement/ImportEquipement'
import * as XLSX from "xlsx";
import ReactPaginate from "react-paginate";

import { ToastContainer, toast } from 'react-toastify';




const ListEquipement = () => {
    const [projet, setprojet] = useState({})
    const [equipements, setequipemets] = useState([])
    const [loddings, setloddings] = useState(false)
    const { Axios, AdmingetToken } = AuthUser()
    const { id } = useParams()
    const GetDATAById = async () => {
        await Axios.get(`/${AdmingetToken() ? 'admin' : 'user'}/mesprojet/show/${id}`).then(res => {
            setequipemets(res.data.equipements)
            setprojet(res.data)
            setloddings(true)
        }).catch(error => {
            console.log(error)
        })
    }
    useEffect(() => {
        GetDATAById()
    }, [id])
    // data
    const deleteDataById = async (equipementId) => {

        await Axios.get(`/${AdmingetToken() ? 'admin' : 'user'}/mesprojet/${id}/equipemets/destroy/${equipementId}`).then(res => {
            toast.success("L'equipement a été supprimé avec succés")
                setTimeout(() => {
                  window.location.reload()
                }, 3000);
        }).catch(er => {
            console.log(er)
        })
    }





    const exportData = () => {
        const wb = XLSX.utils.book_new()
        const filteredEquipements = equipements.map(({ reference, licence, startDate, endDate, serialnumber }) => ({ reference, licence, startDate, endDate, serialnumber }));

        const ws = XLSX.utils.json_to_sheet(filteredEquipements)
        XLSX.utils.book_append_sheet(wb, ws, "mySheet")
        XLSX.writeFile(wb, `${projet.name}-export.xlsx`)
    }





    // function to sort the list by date
    const [sortOrder, setSortOrder] = useState();
    const sortequipment = (order) => {

        const sortedItems = [...equipements].sort((a, b) => {
            if (order === "ascending") {
                return new Date(a.startDate) - new Date(b.startDate)
            }
            if (order === "descending") {
                return new Date(b.startDate) - new Date(a.startDate)
            }
        });
        setSortOrder(order)
        setequipemets(sortedItems);
    };


    // function to search for items by serial number
    // const data = [... new Set(projet.equipements)]
    // console.log(data)
    
 const [searchTerm, setSearchTerm] = useState("");
    const [searchedList, setsearchedList] = useState([])
    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setpageCount] = useState(0)
    const [showItem, setShowItem] = useState(100)
    const [currentItem, setcurrentItems] = useState([])

    useEffect(() => {

        const searchedequipement = equipements.filter((item) => {
            if (searchTerm === "") {
                return true; 
            }
            return item.serialnumber.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setsearchedList(searchedequipement)

        const endOffset = itemOffset + showItem;
        setcurrentItems(searchedList.slice(itemOffset, endOffset))
        setpageCount(Math.ceil(equipements.length / showItem));
    }, [itemOffset, showItem, equipements, searchedList])

    const handlePageClick = (event) => {
        const newOffset = (event.selected * showItem) % equipements.length;
        setItemOffset(newOffset);
    };





    // modal create equipement
    const [isModalOpen, setIsModalOpen] = useState(false);

    function opModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }


    // modal update equipment
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [EquipementId, setEquipemetId] = useState()

    function opModal1(equipementId) {
        setIsModalOpen1(true)
        setEquipemetId(equipementId)

    }

    function closeModal1() {
        setIsModalOpen1(false)
    }
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [projectId, setProjectId] = useState()

    function opModal2(projetId) {
        setIsModalOpen2(true)
        setProjectId(projectId)
    }

    function closeModal2() {
        setIsModalOpen2(false)
    }






    return (
        <>
        <ToastContainer />
            <Helmet title="liste equipement">
                {
                    loddings ?

                        <section className='listeEquipement_section'>
                            <div className="content">

                                <div className="top">
                                    <div className="left">
                                        <div><span>Projet :</span><h2>{projet.name}</h2></div>
                                        <div><span>Site : </span><h4>{projet.client}</h4></div>
                                        <div><span>description : </span><p>{projet.description}</p></div>
                                    </div>
                                    <div className="right">
                                        <button className='btn2' onClick={opModal}>Ajouter Equipement</button>
                                        <button className='btn3' onClick={() => opModal2(id)}>Importer Equipement</button>

                                    </div>
                                </div>
                                <div className="bottom">
                                    <div className="head">
                                        <div className="title">
                                            <h2>Les equipements</h2>
                                        </div>
                                        <div className="search-bar">
                                            <i class="ri-search-2-line"></i>
                                            <input type='text' placeholder='chercher par nombre de serie' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                        </div>
                                        <div className="outils">
                                            <div className="sort">
                                                <select value={sortOrder} onChange={(e) => sortequipment(e.target.value)}>
                                                    <option>Trier par date debut</option>
                                                    <option value="ascending">Trier par ordre croissant</option>
                                                    <option value="descending">Trier par ordre décroissant</option>
                                                </select>
                                            </div>
                                            <div className="export">
                                                <span onClick={exportData}><i class="ri-file-excel-2-line"></i>export</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="list">
                                        <div class="table__body">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th> equipement </th>
                                                        <th>description / Licence</th>
                                                        <th> date de debut</th>
                                                        <th> date de  fin  </th>
                                                        <th> status  </th>
                                                        <th>numéro de série </th>
                                                        <th> Action </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentItem?.length > 0 ?
                                                            currentItem.map((e, i) => {
                                                                return (
                                                                    <tr key={i}>
                                                                        <td>{e.reference}</td>
                                                                        <td>{e.licence}</td>
                                                                        <td>{e.startDate}</td>
                                                                        <td>{e.endDate} </td>
                                                                        <td className={`status ${new Date(e.endDate).getTime() > new Date().getTime() ? 'not passed' : 'passed'}`}><span></span>{new Date(e.endDate).getTime() > new Date().getTime() ? 'not passed' : 'passed'} </td>
                                                                        <td>{e.serialnumber} </td>

                                                                        <td className='actions'>
                                                                            <span onClick={() => opModal1(e.id)}><i class="ri-edit-fill"></i> </span>
                                                                            <span onClick={() => { deleteDataById(e.id) }}><i class="ri-delete-bin-7-fill"></i></span>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                            :
                                                            <tr>
                                                                <td colSpan={6} className='empty'>Aucun equipement trouvé</td>
                                                            </tr>


                                                    }
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                    <div className="footer">
                                        <div className="showItem">
                                             <select value={showItem} onChange={(e) => setShowItem(e.target.value)} name="" id="">
                                                <option value="100">100</option>
                                                <option value="200">200</option>
                                                <option value="500">500</option>
                                            </select>
                                        </div>
                                        <div className="pagination">
                                             <ReactPaginate
                                                previousLabel={"<"}
                                                nextLabel={">"}
                                                breakLabel={"..."}
                                                pageCount={pageCount}
                                                pageRangeDisplayed={3}
                                                renderOnZeroPageCount={null}
                                                onPageChange={handlePageClick}
                                                containerClassName={"pagination "}
                                                pageClassName={"page-item"}
                                                pageLinkClassName={"page-link"}
                                                previousClassName={"page-item"}
                                                previousLinkClassName={"page-link"}
                                                nextClassName={"page-item"}
                                                nextLinkClassName={"page-link"}
                                                breakClassName={"page-item"}
                                                breakLinkClassName={"page-link"}
                                                activeClassName={"active"}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* modals*/}

                                <CreateEquipement
                                    isOpen={isModalOpen}
                                    isclose={closeModal}
                                />

                                <UpdateEquipement
                                    isOpen={isModalOpen1}
                                    isclose={closeModal1}
                                    equipementId={EquipementId}
                                    projetId={id}
                                />

                                <ImportEquipement
                                    isOpen={isModalOpen2}
                                    isclose={closeModal2}
                                    projectId={id}
                                />

                            </div>
                        </section >
                        : <Loader />
                }
            </Helmet>
        </>
    )
}

export default ListEquipement
