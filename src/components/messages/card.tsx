import emoji from 'emoji-regex'
import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

import { Message, Thread } from '../../graphql/types'
import { colors, layout, typography } from '../../styles'
import { Avatar } from '../avatar'
import { ZoomImage } from '../zoom-image'

interface Props {
  message: Message
  thread?: Thread
  userId?: string
}

const regex = emoji()

export const MessageCard: FunctionComponent<Props> = ({
  message,
  thread,
  userId
}) => {
  const mine = message.user.id === userId

  const time = moment(message.createdAt)

  const differenceInDays = moment().diff(time, 'days')
  const differenceInHours = moment().diff(time, 'hours')

  const isImage = message.body.indexOf('image:') === 0
  const onlyEmoji = message.body.replace(regex, '')?.length === 0

  return (
    <View style={styles.main}>
      {!mine && (
        <Avatar
          seed={message.user.id + thread?.post.id}
          size="small"
          style={styles.avatar}
        />
      )}
      <View style={[styles.message, mine && styles.right]}>
        {isImage ? (
          <ZoomImage
            source={{
              uri: message.body.slice(6)
            }}
          />
        ) : (
          <View
            style={[
              styles.body,
              mine && styles.mine,
              onlyEmoji && styles.bodyEmoji
            ]}>
            <Text
              selectable
              style={[
                styles.bodyText,
                mine && styles.textRight,
                onlyEmoji && styles.bodyTextEmoji
              ]}>
              {message.body}
            </Text>
          </View>
        )}
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
  bodyEmoji: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  bodyText: {
    ...typography.regular,
    color: colors.foreground,
    lineHeight: typography.regular.fontSize * layout.lineHeight
  },
  bodyTextEmoji: {
    fontSize: typography.regular.fontSize * 3,
    lineHeight: typography.regular.fontSize * 2.3 * layout.lineHeight
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
  textRight: {
    textAlign: 'right'
  },
  time: {
    ...typography.small,
    color: colors.foregroundLight,
    marginTop: layout.padding
  }
})
