import AsyncStorage from '@react-native-community/async-storage'
import { gql } from 'apollo-boost'
import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { client } from '../graphql'
import { AuthResult } from '../graphql/types'

interface State {
  initialising: boolean
  signedIn: boolean
}

const initialState: State = {
  initialising: true,
  signedIn: false
}

type StoreApi = StoreActionApi<State>

export const SIGN_UP = gql`
  mutation signUp {
    signUp {
      token
      user {
        id
      }
    }
  }
`

const actions = {
  initialise: () => async ({ setState }: StoreApi) => {
    const token = await AsyncStorage.getItem('@token')

    if (token) {
      setState({
        initialising: false,
        signedIn: true
      })
    } else {
      const { data } = await client.mutate<{
        signUp: AuthResult
      }>({
        mutation: SIGN_UP
      })

      if (data) {
        await AsyncStorage.setItem('@token', data.signUp.token)

        setState({
          initialising: false,
          signedIn: true
        })
      }
    }
  }
}

type Actions = typeof actions

const Store = createStore<State, Actions>({
  actions,
  initialState,
  name: 'auth'
})

export const useAuth = createHook(Store)
