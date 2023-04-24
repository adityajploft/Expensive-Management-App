import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import NavBar from './NavBar'

const Layout = () => {
  return (
    <>
    <div >
    <NavBar/>
    <Header/>
    <div className='content'>
      <Outlet/>
    </div>
    <Footer/>
    </div>
    </>
  )
}

export default Layout