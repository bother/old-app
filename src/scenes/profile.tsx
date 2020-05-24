import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { PostList } from '../components/posts'
import { useProfile } from '../hooks'
import { ProfileParams } from '../navigators/profile'
import { colors, layout, typography } from '../styles'

interface Props {
  navigation: StackNavigationProp<ProfileParams, 'Profile'>
  route: RouteProp<ProfileParams, 'Profile'>
}

export const Profile: FunctionComponent<Props> = () => {
  const { fetch, loading, posts, refetch, user } = useProfile()

  useEffect(() => {
    fetch()
  }, [fetch])

  return (
    <PostList
      header={
        user ? (
          <View style={styles.main}>
            <Text style={styles.title}>Your rating</Text>
            <View style={styles.rating}>
              <Text style={styles.label}>{user.rating.toPrecision(2)}</Text>
            </View>
            <Text style={[styles.title, styles.posts]}>Your posts</Text>
          </View>
        ) : undefined
      }
      loading={loading}
      posts={posts}
      refetch={refetch}
    />
  )
}

const styles = StyleSheet.create({
  label: {
    ...typography.bold,
    color: colors.foreground,
    fontSize: 40
  },
  main: {},
  posts: {
    marginBottom: layout.padding,
    marginTop: layout.margin
  },
  rating: {
    backgroundColor: colors.background,
    borderRadius: layout.radius,
    marginHorizontal: layout.margin,
    paddingHorizontal: layout.margin,
    paddingVertical: layout.padding
  },
  title: {
    ...typography.medium,
    color: colors.foreground,
    fontSize: 20,
    marginBottom: layout.margin,
    marginHorizontal: layout.margin
  }
})
