import { useState } from 'react'

const getCookiePairs = () =>
  document.cookie.split(/;\s?/).map(x => x.split('='))

const getCookie = (targetKey) => {
  const cookie = getCookiePairs()
    .find(([key, value]) => key === targetKey)
  if (cookie) return cookie[1]
}

export const isLoggedIn = () => {
  const sessionID = getCookie('connect.sid')
  if (sessionID) { return true }
}

export const deleteCookie = () => {
  document.cookie = 'connect.sid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

export const useLoggedIn = () => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn())

  const logout = () => {
    deleteCookie()
    setLoggedIn(false)
  }

  const login = () => {
    setLoggedIn(true)
  }

  return { loggedIn, login, logout }
}
