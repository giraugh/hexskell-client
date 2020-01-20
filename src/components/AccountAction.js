import React from 'react'
import { useLoggedIn } from '../hooks/authentication'

import SignIn from './SignIn'
import SignOut from './SignOut'

const AccountAction = () => {
  const { loggedIn, logout, login } = useLoggedIn()

  return <div className='account'>
    {
      loggedIn ? <SignOut callback={logout} /> : <SignIn callback={login} />
    }
  </div>
}

export default AccountAction
