import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Segment } from 'semantic-ui-react'
import FilteredBotGrid from '../components/FilteredBotGrid'

const GET_BOTS = gql`
  {
    bots {
      id
      name
      author {
        id
        displayName
        avatarURL
      }
    }
  }
`

const SORT_ALPHABETICAL = 'alphabetical'
const SORT_WINS_INC = 'wins_inc'
const SORT_WINS_DEC = 'wins_dec'

const sortOptions = [
  { key: SORT_ALPHABETICAL, text: 'alphabetically', value: SORT_ALPHABETICAL },
  { key: SORT_WINS_INC, text: 'by least wins', value: SORT_WINS_INC },
  { key: SORT_WINS_DEC, text: 'by most wins', value: SORT_WINS_DEC }
]

const BotsPage = () => {
  const [, setGridControls] = useState(null)
  const { loading: botsLoading, error: botsError, data: botsData } = useQuery(GET_BOTS)

  if (botsLoading) { return <Segment loading padded='very' /> }
  if (botsError) { return <p> An Error occured </p> }

  const bots = botsData.bots
  return <FilteredBotGrid
    bots={bots}
    sortOptions={sortOptions}
    defaultSort={SORT_ALPHABETICAL}
    onChange={(value) => setGridControls(value)}
    onLoadMore={() => console.log('Load more!')}
  />
}

export default BotsPage
