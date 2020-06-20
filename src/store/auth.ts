import AsyncStorage from '@react-native-community/async-storage'
import messaging from '@react-native-firebase/messaging'
import { getUniqueId } from 'react-native-device-info'
import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { client } from '../graphql'
import { MutationSignUpArgs } from '../graphql/types'
import {
  MutationSignUpPayload,
  PROFILE,
  QueryProfilePayload,
  SIGN_UP
} from '../hooks/profile'
import { config } from '../lib'

interface State {
  initialising: boolean
  notifications: number
  signedIn: boolean
  userId?: string
}

const initialState: State = {
  initialising: true,
  notifications: 0,
  signedIn: false
}

type StoreApi = StoreActionApi<State>

const actions = {
  initialise: () => async ({ setState }: StoreApi) => {
    await messaging().requestPermission()

    await config.init()

    const token = await AsyncStorage.getItem('@token')
    const userId = await AsyncStorage.getItem('@userId')

    if (token && userId) {
      const { data } = await client.query<QueryProfilePayload>({
        query: PROFILE
      })

      setState({
        initialising: false,
        notifications: data.profile.notifications,
        signedIn: true,
        userId
      })
    } else {
      const pushToken = await messaging().getToken()

      const { data } = await client.mutate<
        MutationSignUpPayload,
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
  },
  updateNotifications: (notifications: number) => ({ setState }: StoreApi) => {
    setState({
      notifications
    })
  }
}

type Actions = typeof actions

const Store = createStore<State, Actions>({
  actions,
  initialState,
  name: 'auth'
})

export const useAuth = createHook(Store)
