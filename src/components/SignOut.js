import React from 'react'
import { GoogleLogout } from 'react-google-login'
import propTypes from 'prop-types'

import { GOOGLE_CLIENT_ID } from '../config'

const SignOut = ({ callback }) =>
  <GoogleLogout
    clientId={GOOGLE_CLIENT_ID}
    buttonText="Logout"
    onLogoutSuccess={callback}
  />

SignOut.propTypes = { callback: propTypes.func }

export default SignOut
