import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Header, Segment, Button, Icon, Message, Confirm, Modal } from 'semantic-ui-react'

import BotGrid from '../components/BotGrid'
import { GET_ME_DETAILED } from '../gql/user'
import { REMOVE_BOT } from '../gql/bot'
import { Link } from 'react-router-dom'
import { isLoggedIn } from '../hooks/authentication'
import EditBotPage from './EditBotPage'
import { UserStatistics } from '../components/Statistics'

const DashboardPage = () => {
  const { data: userData, loading: userLoading, error: userError, refetch: refetchUser } = useQuery(GET_ME_DETAILED)
  const [removeBot] = useMutation(REMOVE_BOT)
  const [removingID, setRemovingID] = useState(null)
  const [editingID, setEditingID] = useState(null)

  const handleEditModalClose = () => {
    setEditingID(null)
  }

  const handleDeleteBot = _ => {
    const id = removingID
    removeBot({ variables: { id } })
      .then(_ => console.log(`removed bot with id: ${id}`))
      .then(_ => refetchUser())
  }

  if (!isLoggedIn()) {
    return <Message error> <Message.Header> Unauthorized </Message.Header> Must be logged-in to view dashboard. </Message>
  }

  return (
    <Segment>
      <Confirm
        open={!!removingID}
        onConfirm={_ => { handleDeleteBot(); setRemovingID(null) }}
        onCancel={_ => setRemovingID(null) }
      />
      <Modal
        open={!!editingID}
        onClose={handleEditModalClose}
        basic
      >
        <EditBotPage
          isContinue={false}
          botID={editingID}
          redirect={false}
          handleDidSubmit={() => { setEditingID(null); refetchUser() }}
        />
      </Modal>

      <Header as='h2' dividing> Dashboard </Header>

      <UserStatistics />

      <Button.Group fluid size='large' widths={4}>
        <Button as={Link} to='/create-bot'><Icon name='write'/> Create New Bot</Button>
        <Button as={Link} to='/settings'><Icon name='cog' /> Account Settings</Button>
        <Button as={Link} to='/help'><Icon name='question' /> Help</Button>
      </Button.Group>

      <Header dividing as='h3'> My Bots </Header>
      {(userLoading && !userData)
        ? <Segment loading padded='very' />
        : userError
          ? <p> An Error Occurred </p>
          : <BotGrid
            bots={userData.me.createdBots}
            hideAuthor={true}
            showEdit={true}
            showButtons={true}
            handleDeleteBot={id => setRemovingID(id)}
            handleEditBot={id => setEditingID(id)}
          />
      }
    </Segment>
  )
}

export default DashboardPage
