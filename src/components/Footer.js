import styles from './Footer.module.css'
import React from 'react'

const Footer = () => {
  const fecha = new Date().getFullYear();
    return (
        <>
          <footer className={styles.footer}>
            <p>Una producción de Ivan Santana &copy; {fecha} </p>    
          </footer>  
        </>
    )
}


export default Footer


