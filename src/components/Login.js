import React from 'react'
import Button from './Button'
import { useState } from 'react'



const Login = ({ validateUser }) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    validateUser({email, password})
    setEmail('');
    setPassword('');
    console.log('logging in')
  }  

  return (
    <div>
      <form className='form-control' onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type = 'text'
            placeholder='Enter username/email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            > 
          </input>
        </div>
        <div>
          <label>Password</label>
          <input
          type='text'
          placeholder='Enter password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          >
          </input>
        </div>
        <button 
          className='btn' 
          type='submit'
          style={{fontSize: '12px', background: 'black', cursor: 'pointer', padding: '3px 5px', margin: '0px'}} 
          >Log In</button>
      </form>
    </div>
  )
}

export default Login


// <form className='add-form' onSubmit={handleSubmit}>
//         <div className='form-control'>
//           <label>Email</label>
//           <input 
//             type='text' 
//             placeholder='Enter Your Email'
//             value={email}
//             onChange={e => setEmail(e.target.value)}/>
//         </div>
//         <div className='form-control'>
//           <label>Password</label>
//           <input 
//             ref={pass}
//             type='password' 
//             placeholder='Enter Your Password' 
//             value={password}
//             onChange={e => setPassword(e.target.value)}/>
//             {show ? <i onClick={showpassword}>{Eye}</i>:<i onClick={showpassword}>{EyeSlash}</i>}
//         </div>
//         <Button className='btn btn-block' type='submit' value='Enter'>Submit</Button>
//       </form>