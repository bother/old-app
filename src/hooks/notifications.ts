import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import update from 'immutability-helper'
import { useCallback } from 'react'

import {
  MutationMarkNotificationAsReadArgs,
  Notification
} from '../graphql/types'
import { PROFILE, QueryProfilePayload } from './profile'

const NOTIFICATIONS = gql`
  query notifications {
    notifications {
      id
      action
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

          const profile = proxy.readQuery<QueryProfilePayload>({
            query: PROFILE
          })

          if (profile) {
            proxy.writeQuery({
              data: update(profile, {
                profile: {
                  notifications: {
                    $set: profile.profile.notifications - 1
                  }
                }
              }),
              query: PROFILE
            })
          }
        },
        variables: {
          id
        }
      }),
    [mark]
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
