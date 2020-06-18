import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import update from 'immutability-helper'
import { useCallback } from 'react'

import {
  MutationMarkNotificationAsReadArgs,
  Notification
} from '../graphql/types'
import { useAuth } from '../store'

const NOTIFICATIONS = gql`
  query notifications {
    notifications {
      id
      action
      actor
      targetId
      targetType
      unread
      createdAt
      updatedAt
    }
  }
`

interface QueryNotificationsPayload {
  notifications: Notification[]
}

const MARK_AS_READ = gql`
  mutation markNotificationAsRead($id: String!) {
    markNotificationAsRead(id: $id)
  }
`

interface MutationMarkNotificationAsReadPayload {
  markNotificationAsRead: boolean
}

export const useNotifications = () => {
  const [, { updateNotifications }] = useAuth()

  const [fetch, fetchQuery] = useLazyQuery<QueryNotificationsPayload>(
    NOTIFICATIONS
  )

  const [mark, markMutation] = useMutation<
    MutationMarkNotificationAsReadPayload,
    MutationMarkNotificationAsReadArgs
  >(MARK_AS_READ)

  const markAsRead = useCallback(
    (id: string) =>
      mark({
        update(proxy) {
          const options = {
            query: NOTIFICATIONS,
            variables: {
              id
            }
          }

          const notifications = proxy.readQuery<QueryNotificationsPayload>(
            options
          )

          if (!notifications) {
            return
          }

          const index = notifications.notifications.findIndex(
            (notification) => notification.id === id
          )

          const data = update(notifications, {
            notifications: {
              [index]: {
                unread: {
                  $set: false
                }
              }
            }
          })

          proxy.writeQuery<QueryNotificationsPayload>({
            ...options,
            data
          })

          const unread = data.notifications.filter(({ unread }) => unread)
            .length

          updateNotifications(unread)
        },
        variables: {
          id
        }
      }),
    [mark, updateNotifications]
  )

  return {
    fetch,
    fetching: fetchQuery.loading,
    markAsRead,
    marking: markMutation.loading,
    notifications: fetchQuery.data?.notifications ?? [],
    refetch: fetchQuery.refetch
  }
}
