import AsyncStorage from '@react-native-community/async-storage'
import messaging from '@react-native-firebase/messaging'
import gql from 'graphql-tag'
import { getUniqueId } from 'react-native-device-info'
import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { client } from '../graphql'
import { AuthResult, MutationSignUpArgs } from '../graphql/types'

export const SIGN_UP = gql`
  mutation signUp($deviceId: String!, $pushToken: String) {
    signUp(deviceId: $deviceId, pushToken: $pushToken) {
      token
      user {
        id
      }
    }
  }
`

interface State {
  ignored: string[]
  initialising: boolean
  signedIn: boolean
  userId?: string
}

const initialState: State = {
  ignored: [],
  initialising: true,
  signedIn: false
}

type StoreApi = StoreActionApi<State>

const actions = {
  ignorePost: (id: string) => ({ getState, setState }: StoreApi) => {
    const { ignored } = getState()

    setState({
      ignored: [...ignored, id]
    })
  },
  initialise: () => async ({ setState }: StoreApi) => {
    await messaging().requestPermission()

    const token = await AsyncStorage.getItem('@token')
    const userId = await AsyncStorage.getItem('@userId')

    if (token && userId) {
      setState({
        initialising: false,
        signedIn: true,
        userId
      })
    } else {
      const pushToken = await messaging().getToken()

      const { data } = await client.mutate<
        {
          signUp: AuthResult
        },
        MutationSignUpArgs
      >({
        mutation: SIGN_UP,
        variables: {
          deviceId: getUniqueId(),
          pushToken
        }
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
  },
  signOut: () => async ({ setState }: StoreApi) => {
    await AsyncStorage.removeItem('@token')
    await AsyncStorage.removeItem('@userId')

    setState(initialState)
  }
}

type Actions = typeof actions

const Store = createStore<State, Actions>({
  actions,
  initialState,
  name: 'auth'
})

export const useAuth = createHook(Store)
