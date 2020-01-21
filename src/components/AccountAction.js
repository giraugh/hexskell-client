import React from 'react'
import { useLoggedIn } from '../hooks/authentication'

import SignIn from './SignIn'
import AccountDropDown from './AccountDropDown'

const AccountAction = () => {
  const { loggedIn, logout, login } = useLoggedIn()

  return <div className='account'>
    {
      loggedIn ? <AccountDropDown logoutCallback={logout} /> : <SignIn callback={login} />
    }
  </div>
}

export default AccountAction
