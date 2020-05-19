import React, { FunctionComponent } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import { Post } from '../../graphql/types'
import { colors, layout, typography } from '../../styles'
import { Refresher } from '../refresher'
import { Touchable } from '../touchable'
import { PostCard } from './card'

interface Props {
  posts: Post[]
  loading: boolean

  fetchMore?: () => void
  refetch: () => void
}

export const PostList: FunctionComponent<Props> = ({
  fetchMore,
  loading,
  posts,
  refetch
}) => (
  <FlatList
    ListEmptyComponent={
      <View style={styles.empty}>
        <Text style={styles.message}>No posts found.</Text>
      </View>
    }
    ListFooterComponent={
      fetchMore ? (
        <Touchable onPress={fetchMore} style={styles.button}>
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
  empty: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  message: {
    ...typography.small,
    color: colors.foreground,
    margin: layout.margin * 2,
    textAlign: 'center'
  },
  more: {
    ...typography.small,
    alignSelf: 'center'
  }
})
