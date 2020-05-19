import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect } from 'react'

import { PostList } from '../components/posts'
import { useLatest } from '../hooks'
import { PostsParams } from '../navigators/posts'

interface Props {
  navigation: StackNavigationProp<PostsParams, 'Latest'>
  route: RouteProp<PostsParams, 'Latest'>
}

export const Latest: FunctionComponent<Props> = () => {
  const { fetchNext, fetchPosts, loading, posts, refetch } = useLatest()

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return (
    <PostList
      fetchNext={fetchNext}
      loading={loading}
      posts={posts}
      refetch={refetch}
    />
  )
}
