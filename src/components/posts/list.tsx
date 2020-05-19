import React, { FunctionComponent } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import Image from 'react-native-fast-image'

import { img_hero_not_found } from '../../assets'
import { Post } from '../../graphql/types'
import { colors, layout, typography } from '../../styles'
import { Refresher } from '../refresher'
import { Touchable } from '../touchable'
import { PostCard } from './card'

interface Props {
  posts: Post[]
  loading: boolean

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
      <View style={styles.empty}>
        <Image source={img_hero_not_found} style={styles.image} />
        <Text style={styles.message}>No posts found.</Text>
      </View>
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
  empty: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  image: {
    height: layout.hero,
    width: layout.hero
  },
  message: {
    ...typography.regular,
    color: colors.foreground,
    marginHorizontal: layout.margin * 2,
    marginTop: layout.margin,
    textAlign: 'center'
  },
  more: {
    ...typography.small,
    alignSelf: 'center'
  }
})
