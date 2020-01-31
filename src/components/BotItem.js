import React from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card, List, Button, Icon } from 'semantic-ui-react'
import ProfilePicture from './ProfilePicture'

// const IMG_SRC = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F32%2F5b%2F5a%2F325b5a537d7f9edf317eed7354853160--neon-genesis-evangelion-minimalism.jpg&f=1&nofb=1'
const PLACEHOLDER_WINS = 12
const PLACEHOLDER_RANK = 3

const cardStyle = {
  width: '95%',
  textAlign: 'start',
  height: 'min-content'
}

const statisticsStyle = {
  lineHeight: '100%',
  padding: '2px'
}

const buttonsStyle = {
  padding: '5px'
}

const DO_NOTHING = () => {}

const BotItem = ({ data: { id, name, author, published }, handleDeleteBot = DO_NOTHING, handleEditBot = DO_NOTHING, hideAuthor = false, hideBotLink = false, showEdit = false, showButtons = false }) => (
  <Card style={cardStyle}>
    <Card.Content>
      <ProfilePicture user={author} doFloat={true} />
      <Card.Header as={hideBotLink ? 'span' : Link} to={`/bot/${id}`}> {name} </Card.Header>
      { !hideAuthor &&
        (<Card.Meta> <span className='author'>Created by <Link to={`/user/${author.id}`}>{author.displayName}</Link> </span></Card.Meta>)
      }
    </Card.Content>
    <Card.Content extra textAlign='center' style={statisticsStyle}>
      {published
        ? <>
          <List horizontal>
            <List.Item> {PLACEHOLDER_WINS} wins </List.Item>
            <List.Item>-</List.Item>
            <List.Item> {PLACEHOLDER_WINS / 2} ties </List.Item>
            <List.Item>-</List.Item>
            <List.Item> ranked #{PLACEHOLDER_RANK} </List.Item>
          </List>
        </> : <>
          <span> - Not Yet Published - </span>
        </>
      }
    </Card.Content>
    {showButtons &&
      <Card.Content extra style={buttonsStyle}>
        <Button.Group fluid compact widths={2}>
          { showEdit
            ? <>
              <Button color={'blue'} onClick={_ => handleEditBot(id)}> <Icon name='write' /> Edit </Button>
              <Button negative onClick={_ => handleDeleteBot(id)}> <Icon name='trash' /> Remove </Button>
            </> : <>
              {/* The following is unused as of now */}
              <Button as={Link} to={`/match-with/${id}`}> <Icon name='chess' /> Practice Match </Button>
              <Button as={Link} to={`/bot/${id}`}> <Icon name='ellipsis horizontal' /> More </Button>
            </>
          }
        </Button.Group>
      </Card.Content>
    }
  </Card>
)

BotItem.propTypes = {
  data: propTypes.object,
  hideBotLink: propTypes.bool,
  hideAuthor: propTypes.bool,
  showEdit: propTypes.bool,
  showButtons: propTypes.bool,
  handleDeleteBot: propTypes.func,
  handleEditBot: propTypes.func
}

export default BotItem
