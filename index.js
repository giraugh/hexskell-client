import React from 'react'
import { render } from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import App from './src/components/App'

import 'semantic-ui-css/semantic.min.css'

const client = new ApolloClient({
  uri: 'http://localhost:8090/graphql',
  credentials: 'include'
})

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.querySelector('#root')
)
