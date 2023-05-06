import React from 'react'
import Layout from '../../components/layout/Layout'
import Styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Register() {
    
    // hooks
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [answer, setAnswer] = useState('')
    const navigate = useNavigate()
    
    
    // handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault()
        const URL = process.env.REACT_APP_API_URL
        axios.post(`${URL}/api/auth/register`, {
            name,
            email,
            password,
            phone,
            address,
            answer
        })
        .then(res => {
        
            console.log(res)
            toast.success(res.data.message)
            navigate('/login')
        })
        .catch(err => {
            console.log(err)
            toast.error(err.response.data.error,{
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,


            })
        })
    }
    
    // styling
   
    return (

    <Layout>
<RegisterContainer>
       <div className="login-box">
  <p>Sign up</p>
  <form onSubmit={handleSubmit}>
    <div className="user-box">
      <input required  type="text"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />
      <label>Name</label>
    </div>
    <div className="user-box">
      <input required  type="email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      />
      <label>Email</label>
    </div>
    <div className="user-box">
      <input required  type="password" 
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />
      <label>Password</label>
    </div>

    <div className="user-box">
      <input required  type="text" 
        value={phone}
        onChange={(e)=>setPhone(e.target.value)}
      
      />
      <label>Phone</label>
    </div>
    <div className="user-box">
      <input required  type="text"
        value={address}
        onChange={(e)=>setAddress(e.target.value)}
      />
      <label>Address</label>
    </div>
    <div className="user-box">
      <input required  type="text"
        value={answer}
        onChange={(e)=>setAnswer(e.target.value)}
      />
      <label>What's nick name of your best friend?</label>
    </div>


    
    <button>
      <span />
      <span />
      <span />
      <span />
      Submit
    </button>
  </form>
  <p>Already Have Account? <Link  to="/login" className="a2">Sign in!</Link></p>
</div>

            </RegisterContainer>
     
    </Layout>
  )
  
}



const RegisterContainer = Styled.div`
.login-box {
    position: absolute;
    top: 55%;
    left: 50%;
    width: 400px;
    padding: 40px;
    margin: 20px auto;
    transform: translate(-50%, -55%);
    background: rgba(0,0,0,.9);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0,0,0,.6);
    border-radius: 10px;
  }
  
  .login-box p:first-child {
    margin: 0 0 30px;
    padding: 0;
    color: #fff;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 1px;
  }
  
  .login-box .user-box {
    position: relative;
  }
  
  .login-box .user-box input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
  }
  
  .login-box .user-box label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    pointer-events: none;
    transition: .5s;
  }
  
  .login-box .user-box input:focus ~ label,
  .login-box .user-box input:valid ~ label {
    top: -20px;
    left: 0;
    color: #fff;
    font-size: 12px;
  }
  
  .login-box form button {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    font-weight: bold;
    color: #fff;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    margin-top: 40px;
    letter-spacing: 3px
  }
  
  .login-box button:hover {
    background: #fff;
    color: #272727;
    border-radius: 5px;
  }
  
  .login-box button span {
    position: absolute;
    display: block;
  }
  
  .login-box button span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #fff);
    animation: btn-anim1 1.5s linear infinite;
  }
  
  @keyframes btn-anim1 {
    0% {
      left: -100%;
    }
  
    50%,100% {
      left: 100%;
    }
  }
  
  .login-box button span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #fff);
    animation: btn-anim2 1.5s linear infinite;
    animation-delay: .375s
  }
  
  @keyframes btn-anim2 {
    0% {
      top: -100%;
    }
  
    50%,100% {
      top: 100%;
    }
  }
  
  .login-box button span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #fff);
    animation: btn-anim3 1.5s linear infinite;
    animation-delay: .75s
  }
  
  @keyframes btn-anim3 {
    0% {
      right: -100%;
    }
  
    50%,100% {
      right: 100%;
    }
  }
  
  .login-box button span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #fff);
    animation: btn-anim4 1.5s linear infinite;
    animation-delay: 1.125s
  }
  
  @keyframes btn-anim4 {
    0% {
      bottom: -100%;
    }
  
    50%,100% {
      bottom: 100%;
    }
  }
  
  .login-box p:last-child {
    color: #aaa;
    font-size: 14px;
  }
  
  .login-box a.a2 {
    color: #fff;
    text-decoration: none;
  }
  
  .login-box a.a2:hover {
    background: transparent;
    color: green;
    border-radius: 5px;
  }

`
export default Register