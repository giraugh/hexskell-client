import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Segment, Container } from 'semantic-ui-react'
import ScrollToTop from 'react-router-scroll-top'

import TopBar from './TopBar'

const HomePage = lazy(() => import('../pages/HomePage'))
const BotsPage = lazy(() => import('../pages/BotsPage'))
const BotPage = lazy(() => import('../pages/BotPage'))
const UserPage = lazy(() => import('../pages/UserPage'))
const SettingsPage = lazy(() => import('../pages/SettingsPage'))
const DashboardPage = lazy(() => import('../pages/DashboardPage'))
const CreateBotPage = lazy(() => import('../pages/CreateBotPage'))
const EditBotPage = lazy(() => import('../pages/EditBotPage'))

const withSuspense = (Page, props) => _ => (<Suspense fallback={<div>loading...</div>}> <Page {...props} /> </Suspense>)

const App = () => {
  return (
    <Router>
      <ScrollToTop>
        <Segment basic style={{ minHeight: 700, padding: '1em 0em' }}>
          <TopBar />
          <Container>
            <Switch>
              <Route exact path='/' component={withSuspense(HomePage)} />
              <Route exact path='/bots' component={withSuspense(BotsPage)}/>
              <Route exact path='/bot/:id' component={withSuspense(BotPage)}/>
              <Route exact path='/user/:id' component={withSuspense(UserPage)}/>
              <Route exact path='/settings' component={withSuspense(SettingsPage)}/>
              <Route exact path='/dash' component={withSuspense(DashboardPage)}/>
              <Route exact path='/create-bot' component={withSuspense(CreateBotPage)}/>
              <Route exact path='/create-bot/continue/:id' component={withSuspense(EditBotPage, { isContinue: true })}/>
              <Route exact path='/edit-bot/:id' component={withSuspense(EditBotPage)}/>
            </Switch>
          </Container>
        </Segment>
      </ScrollToTop>
    </Router>
  )
}

export default App
