import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Segment, Container } from 'semantic-ui-react'

import TopBar from './TopBar'

const HomePage = lazy(() => import('../pages/HomePage'))
const BotsPage = lazy(() => import('../pages/BotsPage'))
const BotPage = lazy(() => import('../pages/BotPage'))
const UserPage = lazy(() => import('../pages/UserPage'))
const SettingsPage = lazy(() => import('../pages/SettingsPage'))

const withSuspense = (Page) => _ => (<Suspense fallback={<div>loading...</div>}> <Page/> </Suspense>)

const App = () => {
  return (
    <Router>
      <Segment basic style={{ minHeight: 700, padding: '1em 0em' }}>
        <TopBar />
        <Container style={{ padding: '2em 0em' }}>
          <Switch>
            <Route exact path='/' component={withSuspense(HomePage)} />
            <Route exact path='/bots' component={withSuspense(BotsPage)}/>
            <Route exact path='/bot/:id' component={withSuspense(BotPage)}/>
            <Route exact path='/user/:id' component={withSuspense(UserPage)}/>
            <Route exact path='/settings' component={withSuspense(SettingsPage)}/>
            <Route exact path='/dash'></Route>
          </Switch>
        </Container>
      </Segment>
    </Router>
  )
}

export default App
