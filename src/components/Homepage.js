import React from 'react'
import Button from './Button'
import Login from './Login'
import About from './About'
import Header from './Header'
import { useState } from 'react'


const Homepage = ({ onShow, showLoginButton }) => {

  return (
    <div className='header'>
      <h1>
        My fire to do list app
      </h1>
      <Button
        color={showLoginButton ? 'gray' : 'black'} 
        text={showLoginButton ? 'Log Out' : 'Login'} 
        onClick={onShow}
      />
      <Button
        color='black' 
        text='Create Account' 
        // onClick={onShow}
      />
    </div>
  )
}

export default Homepage