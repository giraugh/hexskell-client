import React, { useState } from 'react'
import { useLoggedIn } from '../hooks/authentication'

import SignIn from './SignIn'
import AccountDropDown from './AccountDropDown'
import { Redirect } from 'react-router-dom'

const AccountAction = () => {
  const { loggedIn, logout, login } = useLoggedIn()
  const [redirectTo, setRedirectTo] = useState(null)

  const handleLogin = () => {
    console.log('loginnnn')
    login()
    setRedirectTo('/dash')
  }

  const handleLogout = () => {
    logout()
    setRedirectTo('/')
    console.log('just logged out')
  }

  return <div className='account'>
    <>
      { redirectTo && <Redirect to={redirectTo} /> }
      { loggedIn ? <AccountDropDown logoutCallback={handleLogout} /> : <SignIn callback={handleLogin} /> }
    </>
  </div>
}

export default AccountAction
