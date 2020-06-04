import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

import { Thread } from '../../graphql/types'
import { colors, layout, typography } from '../../styles'
import { Message } from '../../types'
import { Avatar } from '../avatar'

interface Props {
  message: Message
  thread?: Thread
  userId?: string
}

export const MessageCard: FunctionComponent<Props> = ({
  message,
  thread,
  userId
}) => {
  const mine = message.sender === userId

  const time = moment(message.createdAt)

  const differenceInDays = moment().diff(time, 'days')
  const differenceInHours = moment().diff(time, 'hours')

  return (
    <View style={styles.main}>
      {!mine && (
        <Avatar
          seed={message.sender + thread?.post.id}
          size="small"
          style={styles.avatar}
        />
      )}
      <View style={[styles.message, mine && styles.right]}>
        <View style={[styles.body, mine && styles.mine]}>
          <Text style={styles.bodyText}>{message.body}</Text>
        </View>
        <Text style={styles.time}>
          {moment(message.createdAt).format(
            differenceInDays >= 7
              ? 'MMM D LT'
              : differenceInHours >= 24
              ? 'ddd LT'
              : 'LT'
          )}
        </Text>
      </View>
    </View>
  )
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  avatar: {
    marginRight: layout.margin
  },
  body: {
    backgroundColor: colors.accent,
    borderRadius: layout.radius * 5,
    maxWidth: width * 0.7,
    paddingHorizontal: layout.padding * layout.lineHeight,
    paddingVertical: layout.padding
  },
  bodyText: {
    ...typography.regular,
    color: colors.foreground,
    lineHeight: typography.regular.fontSize * layout.lineHeight
  },
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: layout.margin,
    paddingVertical: layout.padding
  },
  message: {
    alignItems: 'flex-start'
  },
  mine: {
    backgroundColor: colors.highlight
  },
  right: {
    alignItems: 'flex-end',
    flex: 1
  },
  time: {
    ...typography.small,
    color: colors.foregroundLight,
    marginTop: layout.padding
  }
})
