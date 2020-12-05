import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import fit from '../images/fitcouple.png'



const useStyles = makeStyles({

    root:{
        minHeight: '250px',
        minWidth: '275px',
         backgroundImage: 'url(${fit})'
       
    },

});

 const HomePage = () => {
     const classes = useStyles()
    return (
        <div className="Home">HomePage
      
            <img style={{  minHeight: '100vh'
        }} src={fit} alt=""/>
        </div>
    )
}


export default HomePage