import AsyncStorage from '@react-native-community/async-storage'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
// import { API_URI } from 'react-native-dotenv'

const API_URI = 'http://192.168.86.26:4005'

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  onError(error) {
    error.graphQLErrors?.forEach((error) => {
      if (error?.extensions?.code === 'UNAUTHENTICATED') {
        AsyncStorage.removeItem('@token')
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
