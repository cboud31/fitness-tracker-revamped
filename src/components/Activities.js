import React from 'react'



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