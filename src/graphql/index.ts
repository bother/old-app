import AsyncStorage from '@react-native-community/async-storage'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { Subscription } from 'apollo-client/util/Observable'
import { ApolloLink, Observable, Operation } from 'apollo-link'
import { split } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { API_URI, WS_URI } from 'react-native-dotenv'

import { mitter } from '../lib'

// const API_URI = 'http://192.168.86.20:4005'
// const WS_URI = 'ws://192.168.86.20:4005'

const errorLink = onError((error) => {
  error.graphQLErrors?.forEach((error) => {
    if (error?.extensions?.code === 'UNAUTHENTICATED') {
      mitter.emit('signout')
    }
  })
})

const request = async (operation: Operation) => {
  const token = await AsyncStorage.getItem('@token')

  if (token) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: Subscription

      Promise.resolve(operation)
        .then((operation) => request(operation))
        .then(() => {
          handle = forward(operation).subscribe({
            complete: observer.complete.bind(observer),
            error: observer.error.bind(observer),
            next: observer.next.bind(observer)
          })
        })
        .catch(observer.error.bind(observer))

      return () => {
        if (handle) {
          handle.unsubscribe()
        }
      }
    })
)

const httpLink = new HttpLink({
  uri: `${API_URI}/graphql`
})

const wsLink = new WebSocketLink({
  options: {
    connectionParams: async () => {
      const token = await AsyncStorage.getItem('@token')

      if (token) {
        return {
          Authorization: `Bearer ${token}`
        }
      }
    },
    reconnect: true
  },
  uri: `${WS_URI}/graphql`
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)

    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, requestLink, link])
})
