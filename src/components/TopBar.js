import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import {
  Menu,
  Container
} from 'semantic-ui-react'

import AccountAction from './AccountAction'

const leftItemStyle = {
  alignSelf: 'center'
}

const TopBar = () => {
  const { pathname } = useLocation()
  return (
    <Menu
      size='large'
      secondary
      pointing
      style={{ border: 'none' }}
    >
      <Container>
        <Menu.Item header as={Link} style={leftItemStyle} to='/' active={pathname === '/'}>Haskell</Menu.Item>
        <Menu.Item as={Link} to='/bots' style={leftItemStyle} active={pathname === '/bots'}>Bots</Menu.Item>
        <Menu.Item position='right'>
          <AccountAction />
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default TopBar
