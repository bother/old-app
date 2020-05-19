import {
  createStackNavigator,
  TransitionPresets
} from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { useSafeArea } from 'react-native-safe-area-context'

import { Header } from '../components'
import { Create, Post } from '../scenes'
import { layout } from '../styles'

export type CreateParams = {
  Create: undefined
  Post: {
    id: string
  }
}

const { Navigator, Screen } = createStackNavigator<CreateParams>()

export const CreateNavigator: FunctionComponent = () => {
  const { top } = useSafeArea()

  return (
    <Navigator>
      <Screen
        component={Create}
        name="Create"
        options={{
          header: (props) => <Header {...props} />,
          headerStyle: {
            height: layout.header + top
          },
          title: 'Create'
        }}
      />
      <Screen
        component={Post}
        name="Post"
        options={{
          ...TransitionPresets.ModalPresentationIOS,
          cardOverlayEnabled: true,
          header: (props) => <Header {...props} />,
          headerStyle: {
            height: layout.header + top
          },
          title: 'Post'
        }}
      />
    </Navigator>
  )
}
