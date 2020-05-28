import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Notification } from '../../graphql/types'
import { useNotifications } from '../../hooks'
import { colors, layout, typography } from '../../styles'
import { Avatar } from '../avatar'
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
      <Avatar seed={notification.actor + notification.targetId} />
      <View style={styles.details}>
        <Text style={[styles.body, notification.unread && styles.unread]}>
          {notification.action === 'comment'
            ? 'Someone commented on your post.'
            : '¯_(ツ)_/¯'}
        </Text>
        <Text style={styles.time}>
          {moment(notification.updatedAt).fromNow()}
        </Text>
      </View>
    </Touchable>
  )
}

const styles = StyleSheet.create({
  body: {
    ...typography.regular,
    color: colors.foregroundLight,
    lineHeight: typography.regular.fontSize * layout.lineHeight,
    marginBottom: 'auto'
  },
  details: {
    flex: 1,
    marginLeft: layout.margin
  },
  main: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: layout.radius * 2,
    flexDirection: 'row',
    marginHorizontal: layout.margin,
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
