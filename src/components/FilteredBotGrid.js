import React, { useState } from 'react'
import propTypes from 'prop-types'
import {
  Segment,
  Container,
  Button,
  Input,
  Checkbox,
  Dropdown,
  List
} from 'semantic-ui-react'

import BotGrid from './BotGrid'

const FilteredBotGrid = ({ bots, sortOptions, defaultSort, onChange, onLoadMore, ...opts }) => {
  const [filterText, setFilterText] = useState('')
  const [sortOption, setSortOption] = useState(defaultSort)
  const [filterPublished, setFilterPublished] = useState(false)
  const [filterMine, setFilterMine] = useState(false)
  const [stateDidChange, setStateDidChange] = useState(false)

  const handleStateChange = () => setStateDidChange(true)

  if (stateDidChange) {
    setStateDidChange(false)
    onChange({
      filterText,
      sortOption,
      filterPublished,
      filterMine
    })
  }

  return (
    <Segment>
      <Container textAlign='center' style={{ paddingBottom: '1em' }}>
        <Container textAlign='left'>
          <List horizontal>
            <List.Item>
              <Input
                icon='search'
                placeholder='Filter...'
                value={filterText}
                onChange={(_, { value }) => { setFilterText(value); handleStateChange() }}
              />
            </List.Item>
            <List.Item>
              Sort <Dropdown
                inline
                options={sortOptions}
                value={sortOption}
                onChange={(_, { value }) => { setSortOption(value); handleStateChange() }}
              />
            </List.Item>
            <List.Item>
              <Checkbox
                label='Published'
                checked={filterPublished}
                onChange={(_, { checked }) => { setFilterPublished(checked); handleStateChange() }}
              />
            </List.Item>
            <List.Item>
              <Checkbox
                label='Mine'
                checked={filterMine}
                onChange={(_, { checked }) => { setFilterMine(checked); handleStateChange() }}
              />
            </List.Item>
          </List>
        </Container>
        <BotGrid bots={bots} {...opts}/>
        <Container style={{ paddingTop: '2em' }}>
          <Button content="Load More" onClick={onLoadMore} />
        </Container>
      </Container>
    </Segment>
  )
}

FilteredBotGrid.propTypes = {
  bots: propTypes.arrayOf(propTypes.object),
  sortOptions: propTypes.arrayOf(propTypes.object),
  defaultSort: propTypes.string,
  onChange: propTypes.func,
  onLoadMore: propTypes.func
}

export default FilteredBotGrid
