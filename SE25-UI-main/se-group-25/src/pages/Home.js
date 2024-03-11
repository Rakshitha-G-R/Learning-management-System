import React from 'react'
import './styles/homepage.css'

function Home({user}) {
  return (
    <div className='home-page'>Welcome {user.fname}</div>
  )
}

export default Home