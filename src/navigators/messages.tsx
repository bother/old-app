import {
  createStackNavigator,
  TransitionPresets
} from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { useSafeArea } from 'react-native-safe-area-context'

import { Header } from '../components'
import { Messages, Post, Thread } from '../scenes'
import { colors, layout } from '../styles'

export type MessagesParams = {
  Messages: undefined
  Thread: {
    id?: string
    post?: string
    user?: string
  }
  Post: {
    id: string
  }
}

const { Navigator, Screen } = createStackNavigator<MessagesParams>()

export const MessagesNavigator: FunctionComponent = () => {
  const { top } = useSafeArea()

  return (
    <Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.screen.messages
        }
      }}>
      <Screen
        component={Messages}
        name="Messages"
        options={{
          header: (props) => (
            <Header {...props} background={colors.screen.messages} />
          ),
          headerStyle: {
            height: layout.header + top
          },
          title: 'Messages'
        }}
      />
      <Screen
        component={Thread}
        name="Thread"
        options={{
          header: (props) => (
            <Header {...props} background={colors.screen.messages} />
          ),
          headerStyle: {
            height: layout.header + top
          },
          title: 'Thread'
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
