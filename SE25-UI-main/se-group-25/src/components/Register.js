import React, {useContext, useState} from 'react'
import {useDispatch} from 'react-redux'
import Google from '@mui/icons-material/Google';
import ThemeContext from '../context/ThemeContext';
import axios from 'axios';

function Register({users}) {
    const [errorMessages, setErrorMessages] = useState({});
    const [fname,setFname] = useState("");
    const [lname,setLname] = useState("");
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    const [repass,setRepass] = useState("");
    const {theme} = useContext(ThemeContext)

    const dispatch = useDispatch();

    const register =()=> {
        dispatch({
            type: 'REGISTER',
            payload: {
                id: (new Date).getTime(),
                fname,lname,email,pass
            }
        })
    }

    const errors = {
        email: "Invalid email",
        pass: "Invalid password",
        passMatch: "Passwords do not match",
        length: "Too short length for name",
        already_registered: "User is already registered"
    };
    const renderErrorMessage = (name) =>
    name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>);

    function clear_inputs () {
        setFname("");
        setLname("");
        setEmail("");
        setPass("");
        setRepass("")
        setErrorMessages({});
    }

    const handleGoogleOAuth = () => {
        console.log("sign up with google")
    }

    const handleRegistration = (e) =>{
        e.preventDefault();

        axios.post('http://localhost:8080/api/users/find', 
        {
          email: `${email}`
        }).then((response) => {
            setErrorMessages({name:"already_registered", message: errors.already_registered});
        }, (error) => {
            if(error.response.status == 401)
            {
                if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))){
                    setErrorMessages({name:"email", message:errors.email})
                }
                else if(pass === repass)
                {
                    register();
                    console.warn("Registered")
                    clear_inputs();
                }
                else
                {
                    setErrorMessages({name:"passMatch", message: errors.passMatch});
                }
            }
            else
            {
                console.log(error);
            }
        });
    };

  return (
    <div className="form-wrapper">
        <form onSubmit={handleRegistration} className='form'>
            <div className="input-container">
                <label>First Name</label>
                <input type="text"
                    name="fname"
                    autoFocus
                    required
                    value={fname}
                    onChange = {(e)=>setFname(e.target.value)} />
                {renderErrorMessage("length")}
            </div>
            <div className="input-container">
                <label>Last Name</label>
                <input type="text" name="lname" required value={lname}
                onChange = {(e)=>setLname(e.target.value)}/>
                {renderErrorMessage("length")}
            </div>
            <div className="input-container">
                <label>Email </label>
                <input type="email" name="Email" value={email} required onChange = {(e)=>setEmail(e.target.value)}/>
                {renderErrorMessage("email")}
            </div>
            <div className="input-container">
                <label>Passphrase </label>
                <input type="password" name="pass" required value={pass} onChange = {(e)=>setPass(e.target.value)}/>
            </div>

            <div className="input-container">
                <label>Re-enter Password </label>
                <input type="password" name="repass" required value={repass} onChange = {(e)=>setRepass(e.target.value)}/>
                {renderErrorMessage("passMatch")}
            </div>
        </form>
        {renderErrorMessage("already_registered")}
        <div className="button-container">
            <button className="btn-red" onClick={handleRegistration}>Sign Up</button>
            <button  className={`${theme === 'light' ? 'btn-black' : 'btn-white'} google-login`} onClick={handleGoogleOAuth}><Google /> Sign up With Google</button>
        </div>
    </div>
  )
}

export default Register