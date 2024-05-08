import React from 'react'

const Helmet = (props) => {
    document.title = 'Gestion des licences - ' + props.title
    return <div>{props.children}</div>
}

export default Helmet