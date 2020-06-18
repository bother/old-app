import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect } from 'react'

import { NotificationList } from '../components/notifications'
import { useNotifications } from '../hooks'
import { NotificationsParams } from '../navigators/notifications'
import { useAuth } from '../store'

interface Props {
  navigation: StackNavigationProp<NotificationsParams, 'Notifications'>
  route: RouteProp<NotificationsParams, 'Notifications'>
}

export const Notifications: FunctionComponent<Props> = () => {
  const [, { updateNotifications }] = useAuth()

  const { fetch, fetching, notifications, refetch } = useNotifications()

  useEffect(() => {
    fetch()
  }, [fetch])

  useEffect(() => {
    const unread = notifications.filter(({ unread }) => unread).length

    updateNotifications(unread)
  }, [notifications, updateNotifications])

  return (
    <NotificationList
      loading={fetching}
      notifications={notifications}
      refetch={refetch}
    />
  )
}
