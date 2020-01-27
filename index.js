import React from 'react'
import { render } from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { BACK_END_GQL_ADDRESS } from './src/config'

import App from './src/components/App'

import 'semantic-ui-css/semantic.min.css'

console.log(`Connecting to Graph QL API @ http://${BACK_END_GQL_ADDRESS}`)

const client = new ApolloClient({
  uri: `http://${BACK_END_GQL_ADDRESS}`,
  credentials: 'include'
})

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.querySelector('#root')
)
