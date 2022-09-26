import React from 'react'
import {useState, useRef, useEffect } from 'react'
import Button from './Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignUp = ({ createUser }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const[show, setShow] = useState(false);
  const[showConfirm, setShowConfirm] = useState(false);
  const [showMessage, setShowMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState('')
  const pass = useRef();
  const confirmPass = useRef();

  const Eye = <FontAwesomeIcon className="icon" icon={faEye} />;
  const EyeSlash = <FontAwesomeIcon className="icon" icon ={faEyeSlash}/>;

  //Password Conditions
  useEffect(() => {
    if(password !== confirmPassword) {
      setShowMessage('Passwords do not match!')
      return;
    } else if(password.length < 3 ) {
      setShowErrorMessage('Password must be at least 3 characters long! ')
    }
    else if(password === confirmPassword && password.length >= 13) {
      setShowMessage('')
      setShowErrorMessage('')
    } else {
      return
    };
  }, [password, confirmPassword, email])
  

  const showpassword = () =>{
    setShow(!show)
    pass.current.type = show ? 'password':'text';
    }
  
  const showConfirmPassword = () =>{
    setShowConfirm(!showConfirm)
    confirmPass.current.type = showConfirm ? 'password':'text';
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser({firstName, lastName, email, password});
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    console.log('Creating user')
  }


  return (
    <div className='container'>
      <form className='form-control' onSubmit = {handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type = 'text'
            placeholder='Enter username/email'
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            > 
          </input>
        </div>
        <div>
          <label>Last Name</label>
          <input
          type='text'
          placeholder='Enter Last Name'
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          >
          </input>
        </div>
        <div>
          <label>Email</label>
          <input
          type='text'
          placeholder='Enter Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          >
          </input>
        </div>
        <div>
          <label>Password</label>
          <input
          type='password'
          ref={pass}
          placeholder='Enter Passowrd'
          value={password}
          onChange={e => setPassword(e.target.value)}
          />
          {show ? <i onClick={showpassword}>{Eye}</i>:<i onClick={showpassword}>{EyeSlash}</i>}
        </div>
        <div>
          <label>Re-enter Password</label>
          <input
          type='password'
          ref={confirmPass}
          placeholder='Enter Passowrd'
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          />
          {showConfirm ? <i onClick={showConfirmPassword}>{Eye}</i>:<i onClick={showConfirmPassword}>{EyeSlash}</i>}
        </div>
        <div className='error-message'> {showMessage} </div>
        <div className='error-message'>{showErrorMessage}</div>
        <Button 
        color='black' 
        text='Create User'
        onClick={handleSubmit} />

      </form>
    </div>
  )
}

export default SignUp