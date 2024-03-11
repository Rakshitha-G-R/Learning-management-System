import React, {useContext, useState} from 'react'
import { useDispatch } from 'react-redux';
import ThemeContext from '../context/ThemeContext'
import axios from 'axios';
function EnterPassword({user}) {
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const dispatch = useDispatch();
  const {theme} = useContext(ThemeContext)

  const register =()=> {
    dispatch({
        type: 'CHANGE_PASSWORD',
        payload: {
            id: user.email,
            pass: newPass
        }
    })
}

  const handlePasswordChange = () => {
    if (newPass === confirmPass){
      if (newPass === user.pass){
        alert('Enter a new password')
      } else {
        register();
      }
    }else {
      alert('Passwords do not match')
    }
  }

  return (
    <div>
      <div className='reset-password'>
        <form className='reset-password-form' onSubmit={handlePasswordChange}>
          <div>
            <label>New Password:</label>
            <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)}/>
          </div>
          <div>
            <label>Re-enter New Password: </label>
            <input type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)}/>
          </div>
          <button className={theme === 'light'? "btn-white" : "btn-black"} type='submit' >Submit</button>
        </form>
      </div>
    </div>
  )
}

export default EnterPassword