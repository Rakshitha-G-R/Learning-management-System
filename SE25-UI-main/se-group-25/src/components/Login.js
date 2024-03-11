import React,{useState, useContext} from 'react'
import './styles/login.css'
import ResetPassword from './ResetPassword';
import LoopRoundedIcon from '@mui/icons-material/LoopRounded';
import { useDispatch } from 'react-redux';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import ThemeContext from '../context/ThemeContext';
import axios from 'axios';

function Login({users}) {
    const [errorMessages, setErrorMessages] = useState({});
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    const [resetPassword, setResetPassword] = useState(false);
    const {theme} = useContext(ThemeContext)
    const navigate = useNavigate()
    const errors = {
        email: "Invalid username",
        pass: "Invalid password"
    };
    
    const renderErrorMessage = (name) =>
    name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>);

    function clear_inputs () {
        setEmail("");
        setPass("");
    }

   const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8080/api/users/login', 
        {
          email: `${email}`, 
          password: `${pass}`
        }).then((response) => {
            setErrorMessages({});
            const payload = response.data.user;
            dispatch({
                type: 'LOGIN',
                payload
            })
            alert('Success!!!')
        }, (error) => {
            if(error.response.data.message === "Invalid Password")
            {
                setErrorMessages({ name: "pass", message: error.response.data.message });
            }
            else if(error.response.data.message === "Email Not Found")
            {
                setErrorMessages({ name: "email", message: error.response.data.message });
            }
            else
            {
                setErrorMessages({});
                console.log(error);
            }
        });
    };

    

    const handlePasswordReset = ()=>{
        setResetPassword(true);
    }
    
    const handleGoogleOAuth = () => {
        window.open(
            'http://localhost:8080/auth/google/callback',
            "self"
        );
    }
    

    return (
        <div>
        {resetPassword ? 
            <ResetPassword setResetPassword={setResetPassword} theme={theme}/>
            : 
            <div className="form-wrapper">
            <form className='form'>
                <div className="input-container">
                    <label>Email </label>
                    <input type="email" name="email" value={email} required onChange={(e)=>setEmail(e.target.value)}/>
                    {renderErrorMessage("email")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" value={pass} onChange = {(e)=>setPass(e.target.value)} required/>
                    {renderErrorMessage("pass")}
                </div>
            </form>
            <div className='button-container'>
                    <button className= "btn-red" onClick={handleSubmit}>Log In</button>
                    <button  className={`google-login ${theme === 'light'?"btn-black" : "btn-white"}`} onClick={handleGoogleOAuth}><GoogleIcon /> Sign in With Google</button>
                </div>
            <div className='reset-password-container'>
                    <button className='reset-password-btn' onClick={handlePasswordReset}>
                        <LoopRoundedIcon style ={{color: "#FF472F"}}/>Reset Password
                    </button>
                </div>
        </div>}
        </div>
    )
}
export default Login