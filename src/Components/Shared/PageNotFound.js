import React from 'react'
import PageNotFoundImage from '../../assets/contentImages/404.jpg'
import './PageNotFound.css'

const PageNotFound = () => {
  return (
    <div className='container-404'>
        <h1 className='title-404'>La ruta ingresada no se encuentra registrada</h1>
        <img src={PageNotFoundImage} alt="" className='image-404'/>
        <p className='subtitle-404'>Revisa que el path ingresado sea el indicado y recarga nuevamente la página web</p>
    </div>
  )
}

export default PageNotFound