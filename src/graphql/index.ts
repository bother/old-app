import AsyncStorage from '@react-native-community/async-storage'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { API_URI } from 'react-native-dotenv'

import { mitter } from '../lib'

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  onError(error) {
    error.graphQLErrors?.forEach((error) => {
      if (error?.extensions?.code === 'UNAUTHENTICATED') {
        mitter.emit('signout')
      }
    })
  },
  async request(operation) {
    const token = await AsyncStorage.getItem('@token')

    if (token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`
        }
      })
    }
  },
  uri: `${API_URI}/graphql`
})
