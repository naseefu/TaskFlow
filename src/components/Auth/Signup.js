import React, { useState, useEffect } from 'react';
import signups from '../images/signup2.png';
import './signup.css';
import NavbarAuth from '../commons/NavbarAuth';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../Sevices/Apiservices';
import 'font-awesome/css/font-awesome.min.css';
import Bitmojees from '../bitmoji/Bitmojees';

const Signup = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [profilepicture, setProfilePicture] = useState('');
  const [dateofbirth, setDateofbirth] = useState(''); // Initially empty
  const [isAccept, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [next, setNext] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      setError("Fill all the fields");
      return;
    }

    if (password !== confirmPassword) {
      setError('Password and confirm password must be the same');
      return;
    }

    if (firstname && lastname && email && password && confirmPassword) {
      setNext(true);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }, [error]);

  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    const [year, month, day] = dateValue.split('-');
    const formattedDate = `${day}-${month}-${year}`;
    setDateofbirth(formattedDate);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  

  if (!profilepicture) {
    setError('Please fill all the fields');
    return;
  }

  // Convert dateofbirth from dd-MM-yyyy to yyyy-MM-dd
  const [day, month, year] = dateofbirth.split('-');
  const formattedDate = `${year}-${month}-${day}`;

  try {
    setIsLoading(true);
    const response = await ApiService.registerUser({
      firstname,
      lastname,
      email,
      password,
      phonenumber,
      profilepicture : profilepicture,
      dateofbirth: formattedDate, // Use the formatted date
      isaccept:isAccept? 1 : 0,
    });
    setIsLoading(false);
    navigate('/login');
  } catch (error) {
    setIsLoading(false);
    setError(error.response.data.message || error.message || "Error occurred during Registration");
    setTimeout(() => setError(''), 5000);
  }
};

const [bits,setBits] = useState()
  const [indes,setIndes] = useState()
  const printUrl = (bit,index)=>{
    setBits(bit)
    setIndes(index)
    setProfilePicture(bit)
}


  return (
    <div className='signup'>
      <div className='signup-inputs'>
        <div className='navbarauth'>
          {!next && <NavbarAuth />}
        </div>
        {!next ? (
          <div className='signups1'>
            <div className='signup-title'>
              <h1>Create Account</h1>
              <p>Let's Get Started With Our Task Manager</p>
            </div>
            <div className='input input1'>
              <div className='input1-first'>
                <input
                  type='text'
                  placeholder='First name'
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div className='input1-second'>
                <input
                  type='text'
                  placeholder='Last name'
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>
            <div className='input input2'>
              <input
                type='email'
                placeholder='Email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='input input3'>
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='input input4'>
              <input
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && (
              <div className='signup-error' style={{ padding: '10px 0', color: 'red', fontSize: '13px' }}>
                <p>{error}</p>
              </div>
            )}
            <div className='signup-btn'>
              <button type='submit' className='signup-button' onClick={handleNext}>Next</button>
            </div>
            <div className='signup-already'>
              <p>Already have an account? <a href='/login'>Log in</a></p>
            </div>
          </div>
        ) : (
          <div className='signups1'>
            <div className='signup-title'>
              <h1>Create Account</h1>
              <p>Let's Get Started With Our Task Manager</p>
            </div>

            <div className='input input2'>
              <input
                type='number'
                placeholder='Phone number'
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
                style={{ paddingRight: '10px' }}
              />
            </div>
              <div className='input input2 bitmojis' style={{textAlign:'center',alignItems:'center'}}>
              <p style={{marginBottom:'10px'}}>Choose an avatar</p>
              <Bitmojees bits={bits} indes={indes} printUrl={printUrl}/>
            </div>
            <div className='input input3 dateofbirth' style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label htmlFor="date">Date of birth:</label>
              <input
                type='date'
                id='date'
                placeholder='Date of birth'
                value={dateofbirth.split('-').reverse().join('-')} // Adjust format for input
                onChange={handleDateChange}
                style={{ paddingRight: '10px' }}
              />
            </div>
            <div className='input5'>
              <input
                type='checkbox'
                checked={isAccept}
                onChange={() => setAgree(!isAccept)}
              />
              <label>I agree with the Terms of Services</label>
            </div>
            {error && (
              <div className='signup-error' style={{ padding: '10px 0', color: 'red', fontSize: '13px' }}>
                <p>{error}</p>
              </div>
            )}
            <div className='signup-btn'>
              {isloading ? (
                <button className="buttonload signup-button">
                  <i className="fa fa-spinner fa-spin"></i>
                </button>
              ) : (
                <button type='submit' className='signup-button' onClick={handleSubmit}>Register Now</button>
              )}
            </div>
            <div className='signup-already'>
              <p>Already have an account? <a href='/login'>Log in</a></p>
            </div>
          </div>
        )}
      </div>
      <div className='signup-img'>
        <img src={signups} alt='signup' style={{ display: 'block' }} />
      </div>
    </div>
  );
};

export default Signup;
