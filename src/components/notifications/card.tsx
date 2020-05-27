import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text } from 'react-native'

import { Notification } from '../../graphql/types'
import { useNotifications } from '../../hooks'
import { colors, layout, typography } from '../../styles'
import { Touchable } from '../touchable'

interface Props {
  notification: Notification
}

export const NotificationCard: FunctionComponent<Props> = ({
  notification
}) => {
  const { navigate } = useNavigation()

  const { markAsRead } = useNotifications()

  return (
    <Touchable
      onPress={() => {
        markAsRead(notification.id)

        if (notification.targetType === 'post') {
          navigate('Post', {
            id: notification.targetId
          })
        }
      }}
      style={styles.main}>
      <Text style={[styles.body, notification.unread && styles.unread]}>
        {notification.action === 'comment'
          ? 'Someone commented on your post.'
          : '¯_(ツ)_/¯'}
      </Text>
      <Text style={styles.time}>
        {moment(notification.updatedAt).fromNow()}
      </Text>
    </Touchable>
  )
}

const styles = StyleSheet.create({
  body: {
    ...typography.regular,
    color: colors.foregroundLight,
    marginBottom: 'auto'
  },
  main: {
    backgroundColor: colors.background,
    borderRadius: layout.radius * 2,
    marginHorizontal: layout.margin,
    marginVertical: layout.padding,
    padding: layout.margin
  },
  time: {
    ...typography.small,
    color: colors.foregroundLight,
    marginTop: layout.padding
  },
  unread: {
    ...typography.medium,
    color: colors.foreground
  }
})
