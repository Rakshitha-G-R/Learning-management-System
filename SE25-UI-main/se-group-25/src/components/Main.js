import React,{useState, useContext, Component} from 'react'
import LoginPage from '../pages/LoginPage'
import {Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import PrivateRoute from './PrivateRoute'
import { useSelector } from 'react-redux'
import ThemeContext from '../context/ThemeContext'
import LandingPage from '../pages/LandingPage'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

function Main() {
const {theme, setTheme} =useContext(ThemeContext)

document.body.style.backgroundColor = theme === 'light' ? "#fff" : "#000";
document.body.style.transition = "all 300ms ease";
const users = useSelector(state => state.users)
const loggedInUser= useSelector(state => state.loggedInUser)

return (
    <div className='main-container'>
      <div className='main-wrapper'>
        <button className={`theme-btn theme-btn-${theme}`} onClick = {() => setTheme(theme === 'light'? 'dark':'light')}>{theme === 'light' ? 
          <DarkModeOutlinedIcon style={{color: '#ff1b1b', scale: '80%'}}/> : <LightModeOutlinedIcon style={{color: "#ff1b1b", scale: '80%'}}/>
        }</button>   
      </div>
      <Routes>
        <Route path = '/' element={<LandingPage />}/>
        <Route path ='/login' element={<LoginPage users={users} />} /> 
        <Route element={<PrivateRoute user={loggedInUser}/>}>
            <Route path="/home" element={<Home user={loggedInUser}/>} />
        </Route>
        <Route path='*' element={loggedInUser?<></>:<Navigate replace to ="/login"/>}/>
      </Routes>
    </div>
  )
}

export default Main