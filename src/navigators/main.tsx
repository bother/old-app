import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { FunctionComponent, useEffect } from 'react'

import { TabBar } from '../components'
import { useProfile } from '../hooks'
import { CreateNavigator } from './create'
import { FeedNavigator } from './feed'
import { MessagesNavigator } from './messages'
import { NotificationsNavigator } from './notifications'
import { ProfileNavigator } from './profile'

const { Navigator, Screen } = createBottomTabNavigator()

export const MainNavigator: FunctionComponent = () => {
  const { fetchProfile, user } = useProfile()

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  return (
    <Navigator
      tabBar={(props) => (
        <TabBar {...props} notifications={user?.notifications ?? 0} />
      )}>
      <Screen component={FeedNavigator} name="Feed" />
      <Screen component={CreateNavigator} name="Create" />
      <Screen component={NotificationsNavigator} name="Notifications" />
      <Screen component={MessagesNavigator} name="Messages" />
      <Screen component={ProfileNavigator} name="Profile" />
    </Navigator>
  )
}
