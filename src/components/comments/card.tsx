import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Comment, Post } from '../../graphql/types'
import { colors, layout, typography } from '../../styles'
import { Avatar } from '../avatar'

interface Props {
  comment: Comment
  post: Post
  userId?: string
}

export const CommentCard: FunctionComponent<Props> = ({
  comment,
  post,
  userId
}) => (
  <View style={styles.main}>
    <View>
      <Avatar seed={comment.user.id + post.id} type="comment" user={userId} />
    </View>
    <View style={styles.details}>
      <View style={styles.comment}>
        <Text style={styles.body}>{comment.body}</Text>
      </View>
      <Text style={styles.time}>{moment(comment.createdAt).fromNow()}</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  body: {
    ...typography.small,
    lineHeight: typography.small.fontSize * layout.lineHeight
  },
  comment: {
    alignSelf: 'flex-start',
    backgroundColor: colors.background,
    borderRadius: layout.radius * 1.5,
    maxWidth: '80%',
    paddingHorizontal: layout.padding * 1.2,
    paddingVertical: layout.padding
  },
  details: {
    flex: 1,
    marginLeft: layout.margin
  },
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: layout.margin
  },
  time: {
    ...typography.tiny,
    color: colors.foregroundLight,
    marginTop: layout.padding
  }
})
