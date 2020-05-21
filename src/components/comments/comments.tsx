import moment from 'moment'
import React, { FunctionComponent, useRef } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import { img_hero_not_found } from '../../assets'
import { Comment } from '../../graphql/types'
import { colors, layout, typography } from '../../styles'
import { Avatar } from '../avatar'
import { Error } from '../error'
import { Refresher } from '../refresher'
import { Reply } from './reply'

interface Props {
  comments: Comment[]
  loading: boolean
  replying: boolean

  refetch: () => void
  onReply: (body: string) => Promise<unknown>
}

export const Comments: FunctionComponent<Props> = ({
  comments,
  loading,
  onReply,
  refetch,
  replying
}) => {
  const list = useRef<FlatList>(null)

  return (
    <>
      <Text style={styles.title}>Comments</Text>
      <FlatList
        ListEmptyComponent={
          <Error image={img_hero_not_found} message="No comments yet" />
        }
        contentContainerStyle={styles.content}
        data={comments}
        ref={list}
        refreshControl={<Refresher onRefresh={refetch} refreshing={loading} />}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Avatar seed={item.user.id} />
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
        onReply={async (body) => {
          await onReply(body)

          list.current?.scrollToEnd({
            animated: true
          })
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  body: {
    ...typography.small
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
    flexGrow: 1
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
