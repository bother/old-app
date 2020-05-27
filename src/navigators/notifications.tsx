import {
  createStackNavigator,
  TransitionPresets
} from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { useSafeArea } from 'react-native-safe-area-context'

import { Header } from '../components'
import { Notifications, Post } from '../scenes'
import { layout } from '../styles'

export type NotificationsParams = {
  Notifications: undefined
  Post: {
    id: string
  }
}

const { Navigator, Screen } = createStackNavigator<NotificationsParams>()

export const NotificationsNavigator: FunctionComponent = () => {
  const { top } = useSafeArea()

  return (
    <Navigator>
      <Screen
        component={Notifications}
        name="Notifications"
        options={{
          header: (props) => <Header {...props} />,
          headerStyle: {
            height: layout.header + top
          },
          title: 'Notifications'
        }}
      />
      <Screen
        component={Post}
        name="Post"
        options={{
          ...TransitionPresets.ModalPresentationIOS,
          cardOverlayEnabled: true,
          headerShown: false
        }}
      />
    </Navigator>
  )
}
