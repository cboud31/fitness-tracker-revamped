import React from 'react';

const Routines = (props) => {
    const {masterRoutinesList} =props;
    return (masterRoutinesList.map((routine, indx) => {
        const {name} = routine
        return <h2 key={indx}>{name}</h2>
    }))
}



export default Routines;