import React, { useEffect, useState } from 'react'
import './ListeProject.css'
import { data } from '../../../assets/Database/projetcts'
import { Link, useLocation } from 'react-router-dom'
import UpdateProject from '../UpdateProject/UpdateProject'
import Helmet from '../../../components/Hemlet/Hemlet'
import AuthUser from '../../../api/AuthUser'
import Loader from '../../../components/Loader/Loader'
import ReactPaginate from "react-paginate";

import { ToastContainer, toast } from 'react-toastify';
const ListeProject = () => {
  const [lodding, setlodding] = useState(false)
  const [projets, setprojects] = useState([])
  const [copyProjects, setCopyProjects] = useState([])
  const { Axios, AdmingetToken } = AuthUser()
  const getDATA = async () => {
    await Axios.get(`/${AdmingetToken() ? 'admin' : 'user'}/mesprojet`).then((res) => {
      setprojects(res.data)
      setCopyProjects(res.data)
      setlodding(true)
    })
      .catch(error => {
        console.log(error)
      })
  }
  useEffect(() => {
    getDATA()
  }, [])
  

  const deleteData = (id) => {
    Axios.get(`/${AdmingetToken() ? 'admin' : 'user'}/mesprojet/destroy/${id}`)
    .then(res => {
      toast.success("Le projet a été supprimé avec succés")
      setTimeout(() => {
        window.location.reload()
      }, 3000);
    }).catch(err => {
      seterror(err.response.data.errors)
    })

  }
  const totalEquipements = copyProjects.reduce((total, project) => {
    return total + project.equipements.length;
  }, 0);





  const [sortOrder, setSortOrder] = useState();

  const sortProjects = (order) => {

    const sortedItems = [...projets].sort((a, b) => {
      if (order === "ascending") {
        return new Date(a.created_at) - new Date(b.created_at)
      }
      if (order === "descending") {
        return new Date(b.created_at) - new Date(a.created_at)
      }
    });
    setSortOrder(order)
    setprojects(sortedItems);
  };

  // const [currentPage, setcurrentPage] = useState(1)
  // const recordsPerPage = 8
  // const lastIndex = currentPage * recordsPerPage
  // const firstIndex = lastIndex - recordsPerPage
  // const records = projets.slice(firstIndex, lastIndex)
  // const npage = Math.ceil(projets.length / recordsPerPage)
  // const numbers = [...Array(npage + 1).keys()].slice(1)

  // function prePage() {
  //   if (currentPage !== firstIndex) {
  //     setcurrentPage(currentPage - 1)
  //   }
  // }
  // function nextpage() {
  //   if (currentPage !== lastIndex) {
  //     setcurrentPage(currentPage + 1)
  //   }
  // }
  // function changeCPage(id) {
  //   setcurrentPage(id)
  // }


  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setpageCount] = useState(0)
  const [showItem, setShowItem] = useState(8)
  const [currentItem, setcurrentItems] = useState()

  useEffect(() => {
    const endOffset = itemOffset + showItem;
    setcurrentItems(projets.slice(itemOffset, endOffset))
    setpageCount(Math.ceil(projets.length / showItem));
  }, [itemOffset, showItem, projets])



  const handlePageClick = (event) => {
    const newOffset = (event.selected * showItem) % projets.length;
    setItemOffset(newOffset);
  };

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectId, setprojectId] = useState(null)

  const opModal = (id) => {
    setIsModalOpen(true)
    setprojectId(id)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }

  function convertToK(number) {
    if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'k';
    }
    return number;
  }



  return (
    <Helmet title="list project">
      {
        lodding ?

          <section className='listProject_section'>
            <div className="content">
              <div className="total row2">
                <div className="col">
                  <h2>{convertToK(copyProjects.length)}</h2>
                  <p>Total Projets</p>
                </div>
                <div className="col">
                  <h2>{convertToK(totalEquipements)}</h2>
                  <p>Total Equipements</p>
                </div>
              </div>
              <div className="prjects">
                <div className="head">
                  <div className="title">
                    <h2>Projets <span>par date</span></h2>
                  </div>
                  <div className="right">
                    <div className="sorting__widget">
                      <select value={sortOrder} onChange={(e) => sortProjects(e.target.value)}>
                        <option>Default</option>
                        <option value="ascending">Trier par ordre croissant</option>
                        <option value="descending">Trier par ordre décroissant</option>

                      </select>
                    </div>
                  </div>
                </div>
                <div className=" projects-items row3">

                  {
                    currentItem.length > 0 ?
                      currentItem.map(e => {
                        return (
                          <div className="col">
                            <Link to={`/ListeEquipements/${e.id}`}>
                              <h2>{e.name}</h2>
                              <p>{e.client}</p>
                              <div className="info">
                                <div className="due">
                                  <h5>{new Date(e.created_at).toISOString().slice(0, 10)}</h5>
                                  <p>créé en</p>
                                </div>
                                <div className="count">
                                  <h5>{e.equipements.length}</h5>
                                  <p>Total Equipements</p>
                                </div>
                              </div>
                            </Link>
                            <div className="action">
                              <span onClick={() => opModal(e.id)}><i class="ri-edit-fill"></i></span>
                              <span onClick={() => deleteData(e.id)}><i class="ri-delete-bin-7-fill"></i></span>
                            </div>
                          </div>
                        )
                      })
                      :
                      <h2>Aucun projet trouvé.</h2>
                  }


                </div>
                <ToastContainer />
              </div>
              <div className="foot">
                <div className="counter">
                  <p>Affichage de 1 à {showItem} sur {data.length} entrées</p>
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

              {isModalOpen && <UpdateProject isOpen={isModalOpen} isclose={closeModal} projectId={projectId} />}

            </div>
          </section>
          : <Loader />
      }
    </Helmet>
  )
}

export default ListeProject
