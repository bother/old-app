import moment from 'moment'
import React, { FunctionComponent, useRef, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import { img_hero_not_found } from '../../assets'
import { Comment, Post } from '../../graphql/types'
import { useAuth } from '../../store'
import { colors, layout, typography } from '../../styles'
import { Avatar } from '../avatar'
import { Error } from '../error'
import { PostCard } from '../posts'
import { Refresher } from '../refresher'
import { Touchable } from '../touchable'
import { Reply } from './reply'

interface Props {
  comments: Comment[]
  loading: boolean
  post: Post
  replying: boolean

  refetch: () => void
  onReply: (body: string) => Promise<unknown>
}

export const Comments: FunctionComponent<Props> = ({
  comments,
  loading,
  onReply,
  post,
  refetch,
  replying
}) => {
  const [{ userId }] = useAuth()

  const list = useRef<FlatList>(null)

  const [replied, setReplied] = useState(false)

  const Chat = post.user.id === userId ? View : Touchable

  return (
    <>
      <FlatList
        ListEmptyComponent={
          <Error image={img_hero_not_found} message="No comments yet" />
        }
        ListHeaderComponent={
          <>
            <PostCard link={false} post={post} />
            <Text style={styles.title}>Comments</Text>
          </>
        }
        contentContainerStyle={styles.content}
        data={comments}
        onContentSizeChange={() => {
          if (!replied) {
            return
          }

          list.current?.scrollToEnd({
            animated: true
          })
        }}
        ref={list}
        refreshControl={<Refresher onRefresh={refetch} refreshing={loading} />}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Chat>
              <Avatar
                seed={item.user.id + post.id}
                style={styles.avatar}
                type="comment"
                user={userId}
              />
            </Chat>
            <View style={styles.details}>
              <View style={styles.comment}>
                <Text style={styles.body}>{item.body}</Text>
              </View>
              <Text style={styles.time}>
                {moment(item.createdAt).fromNow()}
              </Text>
            </View>
          </View>
        )}
      />
      <Reply
        loading={replying}
        onReply={(body) => {
          onReply(body)

          setReplied(true)
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: colors.primaryDark
  },
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
  content: {
    flexGrow: 1,
    paddingVertical: layout.padding
  },
  details: {
    flex: 1,
    marginLeft: layout.margin
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: layout.margin,
    marginVertical: layout.padding
  },
  time: {
    ...typography.tiny,
    color: colors.foregroundLight,
    marginTop: layout.padding
  },
  title: {
    ...typography.subtitle,
    margin: layout.margin
  }
})
