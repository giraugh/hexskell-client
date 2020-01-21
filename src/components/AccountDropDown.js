import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { Dropdown, Menu } from 'semantic-ui-react'
import propTypes from 'prop-types'
import ProfilePicture from './ProfilePicture'

const GET_ME = gql`
  {
    me {
      id
      displayName
    }
  }
`

const LOGOUT = 1
const DASHBOARD = 2
const SETTINGS = 3
const ACCOUNT = 4

const AccountDropDown = ({ logoutCallback }) => {
  const { loading: meLoading, error: meError, data: meData } = useQuery(GET_ME)
  const handleLabelClick = (_, { value }) => {
    if (value === LOGOUT) {
      logoutCallback()
    }
  }
  const userName = (!meLoading && !meError) ? meData.me.displayName : 'Account'
  return (
    <Menu compact>
      <Dropdown
        onChange={handleLabelClick}
        item
        trigger={<span><ProfilePicture /> {userName}</span>}
        options={[
          {
            key: 'user',
            text: (
              <span>
                Signed in as <strong>{userName}</strong>
              </span>
            ),
            disabled: true
          },
          { key: DASHBOARD, text: 'Dashboard', href: '/dash' },
          { key: ACCOUNT, text: 'My Account', href: meData ? `/user/${meData.me.id}` : '' },
          { key: SETTINGS, text: 'Account Settings', href: '/settings' },
          { key: LOGOUT, text: 'Logout', value: LOGOUT }
        ]}/>
    </Menu>
  )
}

AccountDropDown.propTypes = {
  logoutCallback: propTypes.func
}

export default AccountDropDown
