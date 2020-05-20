import React, { FunctionComponent } from 'react'
import { FlatList, StyleSheet } from 'react-native'

import { img_hero_not_found } from '../../assets'
import { Post } from '../../graphql/types'
import { layout } from '../../styles'
import { Error } from '../error'
import { Refresher } from '../refresher'
import { PostCard } from './card'

interface Props {
  loading: boolean
  posts: Post[]

  fetchNext?: () => void
  refetch: () => void
}

export const PostList: FunctionComponent<Props> = ({
  fetchNext,
  loading,
  posts,
  refetch
}) => (
  <FlatList
    ListEmptyComponent={
      <Error image={img_hero_not_found} message="No posts found" />
    }
    contentContainerStyle={styles.content}
    data={posts}
    onEndReached={fetchNext}
    refreshControl={<Refresher onRefresh={refetch} refreshing={loading} />}
    renderItem={({ item }) => <PostCard post={item} />}
    style={styles.main}
  />
)

const styles = StyleSheet.create({
  content: {
    flexGrow: 1
  },
  main: {
    paddingBottom: layout.padding
  }
})
