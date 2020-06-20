import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'
import React, { FunctionComponent, ReactElement } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import { img_hero_not_found } from '../../assets'
import { Post } from '../../graphql/types'
import { config } from '../../lib'
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
    renderItem={({ index, item }) => (
      <>
        <PostCard post={item} />
        {config.config.ads_enabled &&
          index > 0 &&
          index % Number(config.config.ads_index) === 0 && (
            <View style={styles.ad}>
              <BannerAd
                size={BannerAdSize.SMART_BANNER}
                unitId={config.config.ads_unit_post}
              />
            </View>
          )}
      </>
    )}
    style={{
      backgroundColor: background
    }}
  />
)

const styles = StyleSheet.create({
  ad: {
    marginTop: layout.margin
  },
  content: {
    flexGrow: 1,
    paddingVertical: layout.margin
  }
})
