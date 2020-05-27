import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect } from 'react'

import { NotificationList } from '../components/notifications'
import { useNotifications } from '../hooks'
import { NotificationsParams } from '../navigators/notifications'

interface Props {
  navigation: StackNavigationProp<NotificationsParams, 'Notifications'>
  route: RouteProp<NotificationsParams, 'Notifications'>
}

export const Notifications: FunctionComponent<Props> = () => {
  const { fetch, fetching, notifications, refetch } = useNotifications()

  useEffect(() => {
    fetch()
  }, [fetch])

  return (
    <NotificationList
      loading={fetching}
      notifications={notifications}
      refetch={refetch}
    />
  )
}
