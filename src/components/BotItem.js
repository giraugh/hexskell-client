import React from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card, Image, List } from 'semantic-ui-react'

// const BotItem = ({ data: { id, name, author }, hideBotLink, hideAuthor }) => <div className='bot'>
//   <h2>
//     {!hideBotLink
//       ? <Link to={`/bot/${id}`}> { name } </Link>
//       : <> { name } </>
//     }
//   </h2>
//   <h3>
//     {!hideAuthor && <>by <Link to={`/user/${author.id}`}>{author.displayName}</Link></>}
//   </h3>
// </div>

const IMG_SRC = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F32%2F5b%2F5a%2F325b5a537d7f9edf317eed7354853160--neon-genesis-evangelion-minimalism.jpg&f=1&nofb=1'
const PLACEHOLDER_WINS = 12
const PLACEHOLDER_RANK = 3

const BotItem = ({ data: { id, name, author }, hideAuthor = false, hideBotLink = false }) => (
  <Card>
    <Card.Content>
      <Image src={IMG_SRC} floated='right' size='mini' avatar/>
      <Card.Header as={hideBotLink ? 'span' : Link} to={`/bot/${id}`}> {name} </Card.Header>
      { !hideAuthor &&
        (<Card.Meta> <span className='author'>Created by <Link to={`/user/${author.id}`}>{author.displayName}</Link> </span></Card.Meta>)
      }
    </Card.Content>
    <Card.Content extra textAlign='center'>
      <List horizontal>
        <List.Item> {PLACEHOLDER_WINS} wins </List.Item>
        <List.Item>-</List.Item>
        <List.Item> {PLACEHOLDER_WINS / 2} ties </List.Item>
        <List.Item>-</List.Item>
        <List.Item> ranked #{PLACEHOLDER_RANK} </List.Item>
      </List>
    </Card.Content>
  </Card>
)

BotItem.propTypes = {
  data: propTypes.object,
  hideBotLink: propTypes.bool,
  hideAuthor: propTypes.bool
}

export default BotItem
