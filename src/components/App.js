import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Segment, Container } from 'semantic-ui-react'

import HomePage from '../pages/HomePage'
import BotsPage from '../pages/BotsPage'
import BotPage from '../pages/BotPage'
import UserPage from '../pages/UserPage'
import TopBar from './TopBar'

const App = () => {
  return (
    <Router>
      <Segment basic style={{ minHeight: 700, padding: '1em 0em' }}>
        <TopBar />
        <Container style={{ padding: '2em 0em' }}>
          <Switch>
            <Route exact path='/'>
              <HomePage />
            </Route>
            <Route exact path='/bots'>
              <BotsPage />
            </Route>
            <Route exact path='/bot/:id'>
              <BotPage />
            </Route>
            <Route exact path='/user/:id'>
              <UserPage />
            </Route>
            <Route exact path='/dash'></Route>
          </Switch>
        </Container>
      </Segment>
    </Router>
  )
}

export default App
