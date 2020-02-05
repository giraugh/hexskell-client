import React from 'react'
import propTypes from 'prop-types'
import { Table } from 'semantic-ui-react'
import { useQuery } from '@apollo/react-hooks'

import { GET_BOT_W_MATCHES } from '../gql/bot'

const BotMatches = ({ id }) => {
  const { loading: botLoading, error: botError, data: botData } = useQuery(
    GET_BOT_W_MATCHES,
    {
      variables: { id }
    }
  )

  const placeHolderMatches = [
    {
      winningCompetitor: 'Bot 2',
      competitors: [
        {
          name: 'Bot 1'
        },
        {
          name: 'Bot 2'
        }
      ],
      rounds: [
        { winner: { name: 'Bot 1' } },
        { winner: { name: 'Bot 2' } },
        { winner: { name: 'Bot 2' } },
        { winner: { name: 'Bot 2' } }
      ]
    }
  ]

  const ready = !botError && !botLoading && botData
  const matches = ready ? botData.bot.tournamentMatches : placeHolderMatches
  const myName = ready ? botData.bot.name : ''

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell> Competing Against </Table.HeaderCell>
          <Table.HeaderCell> Round 1 </Table.HeaderCell>
          <Table.HeaderCell> Round 2 </Table.HeaderCell>
          <Table.HeaderCell> Round 3 </Table.HeaderCell>
          <Table.HeaderCell> Round 4 </Table.HeaderCell>
          <Table.HeaderCell> Winner </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {matches.map(({ competitors, winningCompetitor, rounds = [] }) => {
          const isTie = !winningCompetitor
          const isWin = !isTie && winningCompetitor.name === myName
          const isLoss = !isTie && !isWin
          const title = `${competitors[0].name} vs ${competitors[1].name}`
          const otherCompetitor = competitors[0].name === myName ? competitors[1] : competitors[0]
          return (
            <Table.Row
              positive={isWin}
              negative={isLoss}
              warning={isTie}
              key={title}
            >
              <Table.Cell> { otherCompetitor.name } </Table.Cell>
              {rounds.map(({ winningCompetitor: wc }, i) => (
                <Table.Cell key={i}>
                  { (wc || { name: '?' }).name }
                </Table.Cell>
              ))}
              <Table.Cell> { !isTie ? winningCompetitor.name : '- Tie -' } </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}

BotMatches.propTypes = {
  id: propTypes.string
}

export default BotMatches
