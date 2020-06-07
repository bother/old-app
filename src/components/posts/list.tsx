import React, { FunctionComponent, ReactElement } from 'react'
import { FlatList, StyleSheet } from 'react-native'

import { img_hero_not_found } from '../../assets'
import { Post } from '../../graphql/types'
import { colors, layout } from '../../styles'
import { Error } from '../error'
import { Refresher } from '../refresher'
import { Separator } from '../separator'
import { Spinner } from '../spinner'
import { PostCard } from './card'

interface Props {
  background?: string
  header?: ReactElement
  loading: boolean
  posts: Post[]

  fetchNext?: () => void
  refetch: () => void
}

export const PostList: FunctionComponent<Props> = ({
  background = colors.screen.feed,
  fetchNext,
  header,
  loading,
  posts,
  refetch
}) => (
  <FlatList
    ItemSeparatorComponent={Separator}
    ListEmptyComponent={
      posts.length === 0 ? (
        loading ? (
          <Spinner full />
        ) : (
          <Error image={img_hero_not_found} message="No posts found" />
        )
      ) : null
    }
    ListHeaderComponent={header}
    contentContainerStyle={styles.content}
    data={posts}
    onEndReached={fetchNext}
    refreshControl={<Refresher onRefresh={refetch} refreshing={loading} />}
    renderItem={({ item }) => <PostCard post={item} />}
    style={{
      backgroundColor: background
    }}
  />
)

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingVertical: layout.margin
  }
})
