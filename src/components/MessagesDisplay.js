import React from 'react'
import { Table, Icon, Container, Header } from 'semantic-ui-react'
import propTypes from 'prop-types'

// Logs have format [{ turn, message, isError, active }]
const MessagesDisplay = ({ messages = [], title = 'Logs', titleStyle }) => {
  const sortedMessages = messages.sort((a, b) => a.turn - b.turn)
  return (
    <Container style={{ width: '100%', margin: 0 }}>
      <Header as='h2' style={{ ...titleStyle, marginLeft: 10, marginBottom: 0 }}> { title } </Header>
      <Table celled style={{ margin: 0 }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell collapsing textAlign='center'> Turn </Table.HeaderCell>
            <Table.HeaderCell> Message </Table.HeaderCell>
            <Table.HeaderCell collapsing textAlign='center'> Error </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedMessages.map(msg => (
            <Table.Row key={msg.turn + ':' + msg.message} negative={msg.isError} disabled={!msg.active} style={{ backgroundColor: msg.turn % 2 === 0 ? 'rgba(0,0,50,.02)' : 'white' }}>
              <Table.Cell textAlign='center'> {msg.turn} </Table.Cell>
              <Table.Cell> {msg.message} </Table.Cell>
              <Table.Cell textAlign='center'> {msg.isError && <Icon name='warning' />} </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  )
}

// const placeHolderLogs = Array.from({ length: 15 }).map((_, i) => ({ message: `test log ${i}`, turn: i % 3, isError: i % 5 === 0 }))

MessagesDisplay.propTypes = {
  messages: propTypes.array,
  title: propTypes.string,
  titleStyle: propTypes.object
}

export default MessagesDisplay
