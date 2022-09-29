import React from 'react'
import Button from './Button'
import { useState, useRef } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = ({ validateUser }) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[show, setShow]= useState(false)
  const pass = useRef();

  const Eye = <FontAwesomeIcon className="icon" icon={faEye} />;
  const EyeSlash = <FontAwesomeIcon className="icon" icon ={faEyeSlash}/>;


  // const validateEmail = (email) =>
  //   {
  //       var re = /\S+@\S+\.\S+/;
  //       return re.test(email);
  //   }


  const showpassword = () =>{
    setShow(!show)
    pass.current.type = show ? 'password':'text';
    }
  
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
            type='password'
            ref={pass}
            placeholder='Enter password'
            value={password}
            onChange={e => setPassword(e.target.value)}/>
            {show ? <i onClick={showpassword}>{Eye}</i>:<i onClick={showpassword}>{EyeSlash}</i>}
        </div>
        <Button 
        color='black' 
        text='Log In'
        onClick={handleSubmit} />
        {/* <button 
          className='btn' 
          type='submit'
          style={{fontSize: '12px', background: 'black', cursor: 'pointer', padding: '3px 5px', margin: '0px'}} 
          >Log In</button> */}
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