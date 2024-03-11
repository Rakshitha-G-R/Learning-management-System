import React, {useState, useEffect, useContext} from 'react'
import Login from '../components/Login';
import Register from '../components/Register';
import ThemeContext from '../context/ThemeContext';
import LoginFormContext from '../context/Login-Form-Context';
import Loading from '../components/Loading';

function LoginPage({users}) {
    const {formType, setFormType} = useContext(LoginFormContext);
    const {theme} = useContext(ThemeContext)
    const [isLoading, setLoading] = useState(true) 
    const [timerCount, setTimerCount] = useState(2)

    useEffect(() => {
        let interval = setInterval(() => {
            setTimerCount((lastTimerCount) => {
                lastTimerCount <=1 && clearInterval(interval);
                if (lastTimerCount <=1) setLoading(false);
                if (lastTimerCount <=0) return lastTimerCount;
                return lastTimerCount -1
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isLoading]);
  return (
    <div className='login-container'>
        
        <div className={`${formType}-component`}>
            {isLoading ? <div className='loader'> <Loading /> </div>:
            <div className='login-wrapper'>
                <div className={`select-sign select-sign-${theme}`}>
                    <button name = "sign-in" onClick={(e) => setFormType(e.target.name)} className={formType === "sign-in" ? "sign-in-active":"sign-in"}>Sign In</button>
                    <div></div>
                    <button name ="sign-up" onClick={(e) => setFormType(e.target.name)} className={formType === "sign-up" ? "sign-up-active":"sign-up"}> Sign Up </button>
                </div>
                <div className={`login-form login-form-${theme}`}>
                    <div className='form-type'>
                        {formType === "sign-in" ? <Login users={users}/> : <Register users={users}/>}
                    </div>
                </div>
            </div>}
        </div>
    </div>
  )
}

export default LoginPage