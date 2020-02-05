import React from 'react'
import { Segment, List, Statistic, Table } from 'semantic-ui-react'
import propTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import { GET_MY_STATS } from '../gql/user'
import { GET_BOT_STATS, GET_BOT_STATS_DETAILED } from '../gql/bot'

const statisticListStyle = num => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${num}, 1fr)`
})

const statisticSegmentStyle = {
  background: 'white'
}

const longLabelStyle = {
  lineHeight: 1
}

export const Statistics = ({ stats }) => (
  <Segment textAlign='center' style={statisticSegmentStyle}>
    <List horizontal divided style={statisticListStyle(stats.length)}>
      {
        stats.map(({ label, value, valuePrefix = '' }) => (
          <List.Item key={label}>
            <Statistic
              label={label}
              value={`${valuePrefix}${value}`}
              style={ label.length > 15 ? longLabelStyle : {} }
            />
          </List.Item>
        ))
      }
    </List>
  </Segment>
)

export const UserStatistics = ({ id }) => {
  const { loading: statsLoading, error: statsError, data: statsData } = useQuery(
    GET_MY_STATS,
    {
      pollInterval: 5000
    }
  )

  const placeholderStats = [
    { label: 'Total Wins', value: 0 },
    { label: 'Best Individual Wins', value: 0 },
    { label: 'Best Ranking', value: '?', valuePrefix: '#' },
    { label: 'Bots', value: 0 }
  ]

  const statsFromData = ({ myStatistics: { totalWins, bestRanking, bestIndividualWins, botCount } }) => ([
    { label: 'Total Wins', value: totalWins },
    { label: 'Best Individual Wins', value: bestIndividualWins },
    { label: 'Best Ranking', valuePrefix: '#', value: bestRanking },
    { label: 'Bots', value: botCount }
  ])

  const ready = !statsLoading && !statsError && statsData
  const userStats = ready && statsFromData(statsData)

  return <Statistics stats={ready ? userStats : placeholderStats}/>
}

export const BotStatistics = ({ id }) => {
  const { loading: statsLoading, error: statsError, data: statsData } = useQuery(
    GET_BOT_STATS,
    {
      variables: { id },
      pollInterval: 5000
    }
  )

  const placeholderStats = [
    { label: 'Wins', value: 0 },
    { label: 'Ties', value: 0 },
    { label: 'Ranked', valuePrefix: '#', value: '?' },
    { label: 'Total Matches', value: 0 }
  ]

  const statsFromData = ({ botStatistics: { wins, ties, ranking, numMatches } }) => ([
    { label: 'Wins', value: wins },
    { label: 'Ties', value: ties },
    { label: 'Ranked', valuePrefix: '#', value: ranking },
    { label: 'Total Matches', value: numMatches }
  ])

  const ready = !statsLoading && !statsError && statsData
  const botStats = ready && statsFromData(statsData)

  return <Statistics stats={ready ? botStats : placeholderStats} />
}

export const BotDetailedStatistics = ({ id }) => {
  const { loading: statsLoading, error: statsError, data: statsData } = useQuery(
    GET_BOT_STATS_DETAILED,
    {
      variables: { id },
      pollInterval: 5000
    }
  )

  const statsFromData = ({
    botStatistics: {
      wins,
      ties,
      losses,
      ranking,
      winRate,
      winRateRed,
      winRateBlue,
      averageGameLength
    }
  }) => ([
    { label: 'Wins', value: wins },
    { label: 'Ties', value: ties },
    { label: 'Losses', value: losses },
    { label: 'Ranking', valuePrefix: '#', value: ranking },
    { label: 'Win Rate', valueSuffix: '%', value: winRate * 100 },
    { label: 'Win Rate As Red', valueSuffix: '%', value: winRateBlue * 100 },
    { label: 'Win Rate As Blue', valueSuffix: '%', value: winRateRed * 100 },
    { label: 'Mean Game Length', valueSuffix: ' turns', value: averageGameLength }
  ])

  const placeHolderStats = [
    { label: 'Wins', value: 0 },
    { label: 'Ties', value: 0 },
    { label: 'Losses', value: 0 },
    { label: 'Ranking', valuePrefix: '#', value: '?' },
    { label: 'Win Rate', valueSuffix: '%', value: '?' },
    { label: 'Win Rate As Red', valueSuffix: '%', value: '?' },
    { label: 'Win Rate As Blue', valueSuffix: '%', value: '?' },
    { label: 'Mean Game Length', valueSuffix: ' turns', value: '?' }
  ]

  const ready = !statsLoading && !statsError && statsData
  const stats = ready ? statsFromData(statsData) : placeHolderStats

  return (
    <Table celled striped>
      <Table.Body>
        {stats.map(({ label, value, valuePrefix, valueSuffix }) => (
          <Table.Row key={label}>
            <Table.Cell collapsing style={{ fontWeight: 'bold' }}> { label } </Table.Cell>
            <Table.Cell>  { valuePrefix }{ value }{ valueSuffix } </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

Statistics.propTypes = {
  stats: propTypes.array
}

BotStatistics.propTypes = {
  id: propTypes.string
}

BotDetailedStatistics.propTypes = {
  id: propTypes.string
}

UserStatistics.propTypes = {
  id: propTypes.string
}
