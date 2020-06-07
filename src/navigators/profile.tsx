import { createStackNavigator } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { useSafeArea } from 'react-native-safe-area-context'

import { Header } from '../components'
import { Profile } from '../scenes'
import { colors, layout } from '../styles'

export type ProfileParams = {
  Profile: undefined
}

const { Navigator, Screen } = createStackNavigator<ProfileParams>()

export const ProfileNavigator: FunctionComponent = () => {
  const { top } = useSafeArea()

  return (
    <Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.screen.profile
        }
      }}>
      <Screen
        component={Profile}
        name="Profile"
        options={{
          header: (props) => (
            <Header {...props} background={colors.screen.profile} />
          ),
          headerStyle: {
            height: layout.header + top
          },
          title: 'Profile'
        }}
      />
    </Navigator>
  )
}
