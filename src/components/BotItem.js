import React from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card, List, Button, Icon } from 'semantic-ui-react'
import ProfilePicture from './ProfilePicture'

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

const BotItem = ({ data: { id, name, author, published, wins, ties, ranking }, handleDeleteBot = DO_NOTHING, handleEditBot = DO_NOTHING, hideAuthor = false, hideBotLink = false, showEdit = false, showButtons = false }) => (
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
            <List.Item> {wins} wins </List.Item>
            <List.Item>-</List.Item>
            <List.Item> ranked #{ranking} </List.Item>
            <List.Item>-</List.Item>
            <List.Item> {ties} ties </List.Item>
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
