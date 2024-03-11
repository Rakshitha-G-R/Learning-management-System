import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import "./styles/Landing.css"; // Make sure the path is correct
import { Link, useNavigate } from "react-router-dom";
import Switch from '@mui/material/Switch'; // Import the Switch component
import LoginFormContext from "../context/Login-Form-Context";

const LandingPage = () => {

  const [checked, setChecked] = useState(false);
  const navigate = useNavigate() 
  const [theme,setTheme] = useState('light')

  const toggle = () => {
    document.body.style.backgroundColor = theme==='light'?'#fff':'#000'
    setChecked(!checked);
  }

  const {formType, setFormType} = useContext(LoginFormContext)

  const handleRegister = () => {
    setFormType('sign-up')
    navigate('/login')
  };


  const handleLogin = () => {
    setTimeout(() => {
      setFormType('sign-in')
      navigate('/login');
    },1000)
  };

 
  return (
    <div className="index">
      <div className="div">
        <div className="overlap-group">
          <p className="about">
          <Button
            className="about-button"
            variant="text"
            color="primary"
            onClick={() => {
              alert('About page redirect here');
            }}
          >About
          </Button>
          </p>
          <p className="meet-the-team">
          <Button
            className="meet-the-team-button"
            variant="text"
            color="primary"
            onClick={() => {
              alert('Show the team members here');
            }}
          >Meet The Team
          </Button>
          </p>
          <div className="overlap">
          <div className="log-in-wrapper">
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogin}
                size="large"
                style={{
                  backgroundColor: "#5e0000",
                  borderRadius: "20px",
                  height: "89px",
                  width: "204px",
                }}
                >
                Log In
              </Button>
              <div>
                Want to Sign Up? <a onClick={handleRegister}>Sign UP</a>
              </div>
            </div>
            <div className="overlap-2">
              <img
                className="igniting-the"
                alt="Igniting the"
                src="https://cdn.animaapp.com/projects/65123b68ecd3f27648113047/releases/6514b9edab11653b1bc782f9/img/igniting-the-potential-within-students--1@2x.png"
              />
              <img
                className="imageedit"
                alt="Imageedit"
                src="https://cdn.animaapp.com/projects/65123b68ecd3f27648113047/releases/6514b8f45c8033b4d650f561/img/imageedit-4-9641747844-1-1@2x.png"
              />
            </div>
            <p className="IGNITION">
              <span className="text-wrapper-2">IGNITION</span>
            </p>
          </div>
          <Switch
          className="boo-switch"
            checked={checked}
            color="default" 
            onChange={toggle} // Attach the onChange handler
            inputProps={{ 'aria-label': 'controlled' }}
          />

          <img
            className="layer"
            alt="Layer"
            src="https://cdn.animaapp.com/projects/65123b68ecd3f27648113047/releases/6514b8f45c8033b4d650f561/img/layer-2-1-1@2x.png"
          />
        </div>
        <img
          className="rectangle"
          alt="Rectangle"
          src="https://cdn.animaapp.com/projects/65123b68ecd3f27648113047/releases/6514b8f45c8033b4d650f561/img/rectangle-48-1@2x.png"
        />
        <div className="overlap-3">
          <p className="calendar-based-UI">
            <span className="text-wrapper-3">Calendar Based UI</span>
          </p>
          <div
            className="catchy-statement-may">
              With Ignition, we guarantee that you will never forget about an assignment deadline using our new UI that revolves around the calendar and your schedule.<p></p>
              
              Ignition focusses on the assignments that are due and arranges them in order of priority. Our new algorithm shows the upcoming assignments first.
            </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;