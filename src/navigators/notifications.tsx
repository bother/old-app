import { createStackNavigator } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { useSafeArea } from 'react-native-safe-area-context'

import { Header } from '../components'
import { Notifications } from '../scenes'
import { colors, layout } from '../styles'

export type NotificationsParams = {
  Notifications: undefined
}

const { Navigator, Screen } = createStackNavigator<NotificationsParams>()

export const NotificationsNavigator: FunctionComponent = () => {
  const { top } = useSafeArea()

  return (
    <Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.screen.notifications
        }
      }}>
      <Screen
        component={Notifications}
        name="Notifications"
        options={{
          header: (props) => (
            <Header {...props} background={colors.screen.notifications} />
          ),
          headerStyle: {
            height: layout.header + top
          },
          title: 'Notifications'
        }}
      />
    </Navigator>
  )
}
