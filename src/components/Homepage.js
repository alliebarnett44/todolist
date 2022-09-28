import React from 'react'
import Button from './Button'
import Pic from '../happycactus.webp'
import Login from './Login'
import About from './About'
import Header from './Header'
import { useState } from 'react'


const Homepage = ({ onShow, showLoginButton, onShowCreate, showCreateButton }) => {

  return (
    <>
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
        color={showCreateButton ? 'gray': 'black'}
        text='Create Account' 
        onClick={onShowCreate}
      />
    </div>
    <br/>
    <div>
      <h3>Log in and make a list bitch </h3>
    </div>
    <br/>
    <div className='header'> 
      <img src={Pic} alt="Pic" className='logo' href='#/'/>
    </div>
    </>
  )
}

export default Homepage