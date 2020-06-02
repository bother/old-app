import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Avatar } from '../components'
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
          <View>
            <Avatar seed={user.id} size="large" style={styles.avatar} />
            <Text style={styles.title}>Your rating</Text>
            <View style={styles.rating}>
              <Text style={styles.label}>{user.rating.toPrecision(2)}</Text>
            </View>
            <Text style={styles.title}>Your posts</Text>
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
  avatar: {
    alignSelf: 'center',
    backgroundColor: colors.primaryDark,
    marginTop: layout.margin
  },
  label: {
    ...typography.bold,
    color: colors.foreground,
    fontSize: 40,
    textAlign: 'center'
  },
  rating: {
    backgroundColor: colors.background,
    borderRadius: layout.radius * 2,
    marginHorizontal: layout.margin,
    paddingHorizontal: layout.margin,
    paddingVertical: layout.padding
  },
  title: {
    alignSelf: 'center',
    ...typography.medium,
    color: colors.foreground,
    fontSize: 20,
    marginBottom: layout.margin,
    marginHorizontal: layout.margin,
    marginTop: layout.margin * 2
  }
})
