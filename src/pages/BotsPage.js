import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Segment } from 'semantic-ui-react'
import FilteredBotGrid from '../components/FilteredBotGrid'

const BOTS_PER_PAGE = 12

const GET_BOTS = gql`
  query Bots (
    $sortBy: BotSorting,
    $sortOrder: SortOrder,
    $filters: [BotFilter!],
    $search: String,
    $amount: Int,
    $offset: Int) {
      bots(input: {
        sortBy: $sortBy,
        sortOrder: $sortOrder,
        filters: $filters,
        search: $search,
        amount: $amount,
        offset: $offset
      }) {
        bots {
          id
          name
          author {
            id
            displayName
            avatarURL
          }
        }
        currentPage
        totalPages
      }
  }
`

const SORT_ALPHABETICAL = 'alphabetical'
const SORT_WINS_INC = 'wins_inc'
const SORT_WINS_DEC = 'wins_dec'
const SORT_DATE_CREATED_INC = 'date_created_inc'
const SORT_DATE_CREATED_DEC = 'date_created_dec'

const sortOptions = [
  { key: SORT_ALPHABETICAL, text: 'alphabetically', value: SORT_ALPHABETICAL },
  { key: SORT_WINS_INC, text: 'by least wins', value: SORT_WINS_INC },
  { key: SORT_WINS_DEC, text: 'by most wins', value: SORT_WINS_DEC },
  { key: SORT_DATE_CREATED_INC, text: 'by oldest', value: SORT_DATE_CREATED_INC },
  { key: SORT_DATE_CREATED_DEC, text: 'by newest', value: SORT_DATE_CREATED_DEC }
]

const resolveSortOption = (option) => {
  switch (option) {
    case SORT_ALPHABETICAL:
      return { sortBy: 'ALPHABETICALLY', sortOrder: 'INCREASING' }
    case SORT_WINS_INC:
      return { sortBy: 'WINS', sortOrder: 'INCREASING' }
    case SORT_WINS_DEC:
      return { sortBy: 'WINS', sortOrder: 'DECREASING' }
    case SORT_DATE_CREATED_INC:
      return { sortBy: 'DATE_CREATED', sortOrder: 'INCREASING' }
    case SORT_DATE_CREATED_DEC:
      return { sortBy: 'DATE_CREATED', sortOrder: 'DECREASING' }
  }
  return {}
}

const defaultGridControls = {
  sortOption: SORT_ALPHABETICAL
}

const BotsPage = () => {
  const [loadedAll, setLoadedAll] = useState(false)
  const [gridControls, setGridControls] = useState(defaultGridControls)
  const { loading: botsLoading, error: botsError, data: botsData, fetchMore } = useQuery(
    GET_BOTS,
    {
      variables: {
        ...resolveSortOption(gridControls.sortOption),
        amount: BOTS_PER_PAGE,
        offset: 0,
        search: gridControls.filterText,
        filters: [
          gridControls.filterPublished && 'PUBLISHED',
          gridControls.filterMine && 'MINE'
        ].filter(x => x)
      }
    }
  )

  const handleControlsChanged = value => {
    setGridControls(value)
    setLoadedAll(false)
  }

  const handleLoadMore = (newOffset) => _ => {
    fetchMore(
      {
        variables: { offset: newOffset },
        updateQuery: (prev, { fetchMoreResult }) => {
          // If no fetch then return previous
          if (!fetchMoreResult) return prev

          // Merge new bots array with previous query result
          return Object.assign({}, prev, {
            bots: Object.assign({}, prev.bots, {
              currentPage: fetchMoreResult.bots.currentPage,
              totalPages: fetchMoreResult.bots.totalPages,
              bots: [...prev.bots.bots, ...fetchMoreResult.bots.bots]
            })
          })
        }
      }
    ).then(_ => {
      // Is there more to load?
      if (botsData.bots.currentPage >= botsData.bots.totalPages) {
        setLoadedAll(true)
      } else {
        setLoadedAll(false)
      }
    })
  }

  if (botsLoading && !botsData) { return <Segment loading padded='very' /> }
  if (botsError) { return <p> An Error occured </p> }

  const bots = botsData.bots.bots
  return <FilteredBotGrid
    bots={bots}
    sortOptions={sortOptions}
    defaultSort={defaultGridControls.sortOption}
    onChange={handleControlsChanged}
    showLoadMore={!loadedAll}
    onLoadMore={handleLoadMore(bots.length)}
  />
}

export default BotsPage
