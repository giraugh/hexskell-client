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
  lineHeight: '27px',
  padding: '0px',
  maxHeight: '27px'
}

const buttonsStyle = {
  padding: '5px'
}

const UtilityButtons = ({ id, published, publishingStatus, handleDeleteBot, handleEditBot, handlePublishBot, handleUnpublishBot }) => {
  const buttons = () => {
    if (!published && publishingStatus === 'NOT_PUBLISHED') {
      return <>
        <Button color={'purple'} onClick={_ => handlePublishBot(id)}> <Icon name='bullhorn' /> Publish </Button>
        <Button color={'blue'} onClick={_ => handleEditBot(id)}> <Icon name='write' /> Edit </Button>
        <Button negative onClick={_ => handleDeleteBot(id)}> <Icon name='trash' /> Remove </Button>
      </>
    }

    if (!published && publishingStatus === 'PUBLISHING') {
      return <>
        <Button color={'purple'} disabled> <Icon name='bullhorn' /> Publishing... </Button>
        <Button color={'blue'} onClick={_ => handleEditBot(id)}> <Icon name='write' /> Edit </Button>
        <Button negative onClick={_ => handleDeleteBot(id)}> <Icon name='trash' /> Remove </Button>
      </>
    }

    if (published) {
      return <>
        <Button color={'purple'} onClick={_ => handleUnpublishBot(id)}> <Icon name='undo' /> Unpublish </Button>
        <Button negative onClick={_ => handleDeleteBot(id)}> <Icon name='trash' /> Remove </Button>
      </>
    }
  }

  return <Button.Group fluid compact widths={3}>
    { buttons() }
  </Button.Group>
}

const DO_NOTHING = () => {}

const BotItem = ({
  data: {
    id,
    name,
    author,
    published,
    publishingStatus,
    wins,
    ties,
    ranking
  },
  handleDeleteBot = DO_NOTHING,
  handleEditBot = DO_NOTHING,
  handleUnpublishBot = DO_NOTHING,
  handlePublishBot = DO_NOTHING,
  hideAuthor = false,
  hideBotLink = false,
  showEdit = false,
  showButtons = false
}) => (
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
        <UtilityButtons
          id={id}
          published={published}
          publishingStatus={publishingStatus}
          handleDeleteBot={handleDeleteBot}
          handleEditBot={handleEditBot}
          handleUnpublishBot={handleUnpublishBot}
          handlePublishBot={handlePublishBot}
        />
      </Card.Content>
    }
  </Card>
)

UtilityButtons.propTypes = {
  id: propTypes.string,
  published: propTypes.bool,
  publishingStatus: propTypes.string,
  handleDeleteBot: propTypes.func,
  handleEditBot: propTypes.func,
  handlePublishBot: propTypes.func,
  handleUnpublishBot: propTypes.func
}

BotItem.propTypes = {
  data: propTypes.object,
  hideBotLink: propTypes.bool,
  hideAuthor: propTypes.bool,
  showEdit: propTypes.bool,
  showButtons: propTypes.bool,
  handleDeleteBot: propTypes.func,
  handleEditBot: propTypes.func,
  handlePublishBot: propTypes.func,
  handleUnpublishBot: propTypes.func
}

export default BotItem
