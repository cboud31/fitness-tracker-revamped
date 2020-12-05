import React from 'react'

import NewActivityForm from "./NewActivityForm"



const Activities = (props) => {
    const {masterActivitiesList} = props;
    
    return (

        masterActivitiesList.map( (activity, idx) => {
            const {name} = activity
            return <h2 key={idx}>{name}</h2>
        })
    )
}

export default Activities;