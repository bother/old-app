import React, { FunctionComponent } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'

import { img_hero_not_found } from '../../assets'
import { Post } from '../../graphql/types'
import { colors, layout, typography } from '../../styles'
import { Error } from '../error'
import { Refresher } from '../refresher'
import { Touchable } from '../touchable'
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
    ListFooterComponent={
      fetchNext ? (
        <Touchable onPress={fetchNext} style={styles.button}>
          <Text style={styles.more}>More</Text>
        </Touchable>
      ) : null
    }
    contentContainerStyle={styles.content}
    data={posts}
    refreshControl={<Refresher onRefresh={refetch} refreshing={loading} />}
    renderItem={({ item }) => <PostCard post={item} />}
  />
)

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    backgroundColor: colors.primaryDark,
    borderRadius: layout.radius,
    marginBottom: layout.margin,
    marginTop: layout.padding,
    paddingHorizontal: layout.padding * 1.5,
    paddingVertical: layout.padding
  },
  content: {
    flexGrow: 1
  },
  more: {
    ...typography.small,
    alignSelf: 'center'
  }
})
