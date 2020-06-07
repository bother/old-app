import { createStackNavigator } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { useSafeArea } from 'react-native-safe-area-context'

import { Header } from '../components'
import { Create } from '../scenes'
import { colors, layout } from '../styles'

export type CreateParams = {
  Create: undefined
}

const { Navigator, Screen } = createStackNavigator<CreateParams>()

export const CreateNavigator: FunctionComponent = () => {
  const { top } = useSafeArea()

  return (
    <Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.screen.create
        }
      }}>
      <Screen
        component={Create}
        name="Create"
        options={{
          header: (props) => (
            <Header {...props} background={colors.screen.create} />
          ),
          headerStyle: {
            height: layout.header + top
          },
          title: 'Create'
        }}
      />
    </Navigator>
  )
}
