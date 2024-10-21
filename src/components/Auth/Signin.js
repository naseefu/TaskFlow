import React from 'react'
import signups from '../images/signin.jpg'
import './signup.css'
import { useNavigate } from 'react-router-dom'
import NavbarAuth from '../commons/NavbarAuth'
import { useState } from 'react'
import ApiService from '../../Sevices/Apiservices'
import 'font-awesome/css/font-awesome.min.css';
import { useUser } from '../Context/UserContext'

const Signin = () => {
  const navigate = useNavigate()
  const { login } = useUser();
  const [username,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const [isloading,setIsLoading] = useState(false)
  const handleLogin = async(e)=>{
    
    e.preventDefault();
    if(!username|| !password){
      setError('Fill all the fields')
    }

    try{
      setIsLoading(true)
      const response = await ApiService.loginUser({username,password})
      if(response.statusCode===200){
        localStorage.setItem('token',response.token)
        localStorage.setItem('user',response.user)
        login(response.user)
        navigate('/home/dashboard')
      }
      setIsLoading(false)
    }
    catch(err){
      setIsLoading(false)
      setError(err.response.data.message || err.message || "error during login")
      setTimeout(() => setError(''), 5000);
    }
  }
  return (
    <div className='signup signin'>
      <div className='signup-inputs signin-inputs' style={{padding:0,gap:'3rem',justifyContent:'space-between',minHeight:'fit-content'}}>
        <div className='navbarauth'>
          <NavbarAuth/>
        </div>
        <div className='signups1'>
        <div className='signup-title sign-title'>
          <h1 style={{paddingTop:'20px'}}>Welcome Back</h1>
          <p style={{textAlign:'center'}}>Let's Get Started With Our Task Manager</p>
        </div>
        <div className='input input2 '>
          <input value={username} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='Email address'/>
        </div>
        <div className='input input3'>
          <input value={password} type='text' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        {error && (
              <div className='signup-error' style={{ padding: '10px 0', color: 'red', fontSize: '13px' }}>
                <p>{error}</p>
              </div>
            )}
        <div className='signup-btn'>
          {isloading ? (
                <button className="buttonload signup-button signin-button">
                  <i className="fa fa-spinner fa-spin"></i>
                </button>
              ) :
          <button type='submit' className='signup-button signin-button' onClick={handleLogin}>Login</button>}
        </div>
        <div className='signup-already'>
          <p>Don't have an account? <a href='/signup'>Signup</a></p>
        </div>
        </div>
      </div>
      <div className='signin-img'>
        <img src={signups} alt='signin' />
      </div>
    </div>
  )
}

export default Signin
