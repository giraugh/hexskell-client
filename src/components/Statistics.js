import React from 'react'
import { Segment, List, Statistic } from 'semantic-ui-react'
import propTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import { GET_MY_STATS } from '../gql/user'
import { GET_BOT_STATS } from '../gql/bot'

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
  const { loading: statsLoading, error: statsError, data: statsData } = useQuery(GET_MY_STATS)

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
      variables: { id }
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

Statistics.propTypes = {
  stats: propTypes.array
}

BotStatistics.propTypes = {
  id: propTypes.string
}

UserStatistics.propTypes = {
  id: propTypes.string
}
