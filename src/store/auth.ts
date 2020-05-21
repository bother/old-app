import AsyncStorage from '@react-native-community/async-storage'
import { gql } from 'apollo-boost'
import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { client } from '../graphql'
import { AuthResult } from '../graphql/types'

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

interface State {
  initialising: boolean
  signedIn: boolean
  userId?: string
}

const initialState: State = {
  initialising: true,
  signedIn: false
}

type StoreApi = StoreActionApi<State>

const actions = {
  initialise: () => async ({ setState }: StoreApi) => {
    const token = await AsyncStorage.getItem('@token')
    const userId = await AsyncStorage.getItem('@userId')

    if (token && userId) {
      setState({
        initialising: false,
        signedIn: true,
        userId
      })
    } else {
      const { data } = await client.mutate<{
        signUp: AuthResult
      }>({
        mutation: SIGN_UP
      })

      if (data) {
        await AsyncStorage.setItem('@token', data.signUp.token)
        await AsyncStorage.setItem('@userId', data.signUp.user.id)

        setState({
          initialising: false,
          signedIn: true,
          userId: data.signUp.user.id
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
