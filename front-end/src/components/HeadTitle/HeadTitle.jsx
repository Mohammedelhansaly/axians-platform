import React, { useState } from 'react'
import CreateProject from '../../views/Projects/CreateProject/CreateProject';
import './HeadTitle.css'


const HeadTitle = () => {
  // function to return back
  const retourBack = () => {
    window.history.back()
  }

  // modal create project
  const [isModalOpen, setIsModalOpen] = useState(false);

  function opModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  const splitUrl = location.pathname.split('/').join('').split(/(?=[A-Z])/)
  return (
    <>
      <div className="headtitle_section">
        <div className="container">
          <div className="content">
            <div className="left">
              <h2>tableau de bord</h2>
              <div className="link">
                <p>
                  {
                    splitUrl.map((e, i) => {
                      return (
                        <span key={i}>{e.replace(/\d+$/, '')}</span>
                      )
                    })
                  }
                </p>
              </div>
            </div>
            <div className="right">
              <button className='btn' onClick={opModal}> Nouveau Projet</button>
            </div>
            {
              location.pathname !== '/MesProjets' && location.pathname !== '/dashboard' ? <p className='return' onClick={retourBack}><i class="ri-arrow-left-line"></i><span>retourner</span></p> : null
            }



          </div>
          {/* modals*/}
          {
            isModalOpen && <CreateProject
              isOpen={isModalOpen}
              isclose={closeModal}
            />
          }

        </div>
      </div>
    </>
  )
}

export default HeadTitle