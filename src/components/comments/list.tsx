import React, { FunctionComponent, useRef, useState } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'

import { img_hero_not_found } from '../../assets'
import { Comment, Post } from '../../graphql/types'
import { useAuth } from '../../store'
import { layout, typography } from '../../styles'
import { Error } from '../error'
import { PostCard } from '../posts'
import { Refresher } from '../refresher'
import { Reply } from '../reply'
import { Separator } from '../separator'
import { CommentCard } from './card'

interface Props {
  comments: Comment[]
  loading: boolean
  post: Post
  replying: boolean

  refetch: () => void
  onReply: (body: string) => Promise<unknown>
}

export const CommentList: FunctionComponent<Props> = ({
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

  return (
    <>
      <FlatList
        ItemSeparatorComponent={Separator}
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
          <CommentCard comment={item} post={post} userId={userId} />
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
  content: {
    flexGrow: 1,
    paddingVertical: layout.margin
  },
  title: {
    ...typography.subtitle,
    margin: layout.margin
  }
})
