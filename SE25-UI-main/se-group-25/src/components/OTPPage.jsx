import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import OTPInput from 'react-otp-input'
import ThemeContext from '../context/ThemeContext';

function OTPPage({setShowOTP, handleOTPRequest, sentOtp, setOtpVerified}) {
    const [otp, setOtp] = useState()
    const [timerCount, setTimerCount] = useState(60)
    const [disable, setDisable] = useState(true)
    const {theme} = useContext(ThemeContext)
    function resendOTP () {
        if (disable) return;
        handleOTPRequest();
        setDisable(true)
        setTimerCount(60)
    }

    useEffect(() => {
        let interval = setInterval(() => {
            setTimerCount((lastTimerCount) => {
                lastTimerCount <=1 && clearInterval(interval);
                if (lastTimerCount <=1) setDisable(false);
                if (lastTimerCount <=0) return lastTimerCount;
                return lastTimerCount -1
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [disable]);

    const handleOTPVerification = () => {
        if (parseInt(otp) === sentOtp) {
            setOtpVerified(true)
        }
        else {
            console.log(otp)
            console.log(sentOtp)
            alert("Wrong OTP")
        }
    }

  return (
    <div className='otp-wrapper'>
        <div>
            <button className='btn-red' onClick={() => setShowOTP(false)}>Back</button>
        </div>
        <form className='otp-form' onSubmit={handleOTPVerification}>
            <div className='render-separator'>
                <label className='otp-title'>Enter OTP</label>
                <OTPInput shouldAutoFocus inputStyle="number" value={otp} onChange={setOtp} numInputs={4} renderInput={(props) => <input {...props} />}/>
            </div>
            <button className={`${theme === 'light'?'btn-black' : 'btn-white'}`} onClick={handleOTPVerification}>Submit</button>
        </form>
        <div className={`resend-otp-${theme}`}>
        Didn't get code ?<a className= {`link-${disable?"disabled":"active"}`} onClick={resendOTP}>{disable? `Resend OTP in ${timerCount}s` : 'Resend OTP'}</a>
        </div>
    </div>
  )
}

export default OTPPage