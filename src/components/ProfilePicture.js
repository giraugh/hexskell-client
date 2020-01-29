import React from 'react'
import propTypes from 'prop-types'
import { Image, Icon } from 'semantic-ui-react'
import { useQuery } from '@apollo/react-hooks'

import { GET_ME } from '../gql/user'

// Dont load images from google when on dev because cors is not enabled on localhost domains
const production = process.env.NODE_ENV === 'production'

const ProfilePicture = ({ user, doFloat, ...other }) => {
  const { loading, error, data } = useQuery(GET_ME)

  let imageURL = null
  if (!user && !loading && !error && data) {
    imageURL = data.me.avatarURL
  }

  if (user) {
    imageURL = user.avatarURL
  }

  return (
    <>
      {imageURL && production
        ? <Image src={imageURL} crossOrigin='Anonymous' size='mini' avatar floated={doFloat && 'right'} {...other} />
        : <Icon name='user' circular style={doFloat && { float: 'right' }} {...other} />
      }
    </>
  )
}

ProfilePicture.propTypes = {
  user: propTypes.object,
  doFloat: propTypes.bool
}

export default ProfilePicture
