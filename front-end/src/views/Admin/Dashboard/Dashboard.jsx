import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto';
import './Dashboard.css'
import AuthUser from '../../../api/AuthUser';
import Chart from '../../../components/Chart/Chart';
import Loader from '../../../components/Loader/Loader'
import Hemlet from '../../../components/Hemlet/Hemlet'
import CreateUser from '../CreateUser/CreateUser';

const Dashboard = () => {

  const [lodding, setlodding] = useState(false)
  const { Axios } = AuthUser()
  const [data, setdata] = useState([])
  const [users, setusers] = useState([])

  const [alluser, setalluser] = useState([])
  const fetchdata = async () => {
    await Axios.get('/admin/mesprojet/all').
      then(res => {
        setdata(res.data)
        setlodding(true)
      })
  }
  const fetchuserdata = async () => {
    await Axios.get('/admin/getUsers').
      then(res => {
        setusers(res.data)
      })
  }

  const fetchallUsers = async () => {
    await Axios.get('/admin/allusers').
      then(res => {
        setalluser(res.data)
      })
  }
  const equipements1 = data.map(e => e.equipements);
  const totalEquipements = equipements1.reduce((total, equi) => {
    return total + equi.length;
  }, 0);

  function convertToK(number) {
    if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'k';
    }
    return number;
  }

  const totalcities = [...new Set(data.map(e => e.client))]





  // modal create project
  const [isModalOpen, setIsModalOpen] = useState(false);

  function opModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  useEffect(() => {
    fetchdata()
    fetchuserdata()
    fetchallUsers()
  }, [])
  return (
    <>
      <Hemlet title='tableau de bord'>
        {
          lodding ?

            <section className='dashboard_section'>
              < div className="content" >
                <div className="chart row2">
                  <div className="col">
                    <Chart data={data} />
                  </div>
                  <div className="col">
                    <h2>statistiques</h2>
                  </div>
                </div>
                <div className="list">
                  <div className="row4">
                    <div className="col">
                      <div>
                        <i class="ri-group-fill"></i>
                        <p> Utilisateurs</p>
                      </div>
                      <span>{convertToK(users.length)}</span>
                    </div>
                    <div className="col">
                      <div>
                        <i class="ri-layout-grid-fill"></i>
                        <p>Projets</p>
                      </div>
                      <span>{convertToK(data.length)}</span>
                    </div>
                    <div className="col">
                      <div>
                        <i class="ri-shopping-bag-fill"></i>
                        <p>Equipements</p>
                      </div>
                      <span>{convertToK(totalEquipements)}</span>
                    </div>
                    <div className="col">
                      <div>
                        <i class="ri-building-fill"></i>
                        <p>Villes</p>
                      </div>
                      <span>{totalcities.length}</span>

                    </div>
                  </div>
                </div>
                <div className="users">
                  <div className="createUser">
                    <button className='btn2' onClick={opModal}>Ajouter Utilisateur</button>

                  </div>
                  <div class="table__body">
                    <table>
                      <thead>
                        <tr>
                          <th> profil </th>
                          <th>nom utilisateur</th>
                          <th> email  </th>

                          <th> projets</th>
                          <th> equipements  </th>

                        </tr>
                      </thead>
                      <tbody>
                        {
                          alluser.map(e => {
                            return (
                              <tr>
                                <td><img src={`http://localhost:8000/img/${e.imageUser}`} alt="" /></td>
                                <td>{e.name}</td>
                                <td >{e.email}</td>
                                <td>{convertToK(e.projects?.length)}</td>
                                <td>{convertToK(e.projects.reduce((total, project) => total + project.equipements.length, 0))}</td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>

                  </div>
                </div>
              </div >
              {
                isModalOpen && <CreateUser
                  isOpen={isModalOpen}
                  isclose={closeModal}
                />
              }
            </section >

            : <Loader />
        }
      </Hemlet>
    </>
  )
}

export default Dashboard