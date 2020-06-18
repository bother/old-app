import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { FunctionComponent } from 'react'

import { TabBar } from '../components'
import { CreateNavigator } from './create'
import { FeedNavigator } from './feed'
import { MessagesNavigator } from './messages'
import { NotificationsNavigator } from './notifications'
import { ProfileNavigator } from './profile'

const { Navigator, Screen } = createBottomTabNavigator()

export const MainNavigator: FunctionComponent = () => (
  <Navigator tabBar={(props) => <TabBar {...props} />}>
    <Screen component={FeedNavigator} name="Feed" />
    <Screen component={CreateNavigator} name="Create" />
    <Screen component={NotificationsNavigator} name="Notifications" />
    <Screen component={MessagesNavigator} name="Messages" />
    <Screen component={ProfileNavigator} name="Profile" />
  </Navigator>
)
