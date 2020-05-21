import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect, useState } from 'react'

import { img_hero_location } from '../assets'
import { Error, Spinner } from '../components'
import { Distance, PostList } from '../components/posts'
import { useLocation, useNearby } from '../hooks'
import { PostsParams } from '../navigators/posts'

interface Props {
  navigation: StackNavigationProp<PostsParams, 'Nearby'>
  route: RouteProp<PostsParams, 'Nearby'>
}

export const Nearby: FunctionComponent<Props> = () => {
  const { allowed, coordinates, fetchLocation, fetching } = useLocation()

  const { fetchNext, fetchPosts, loading, posts, refetch } = useNearby()

  const [distance, setDistance] = useState(50)

  useEffect(() => {
    fetchLocation()
  }, [fetchLocation])

  useEffect(() => {
    if (coordinates) {
      fetchPosts(coordinates, distance)
    }
  }, [coordinates, distance, fetchPosts])

  if (fetching) {
    return <Spinner full />
  }

  if (!allowed) {
    return (
      <Error
        image={img_hero_location}
        message="You need to share your location to view nearby posts"
      />
    )
  }

  return (
    <PostList
      fetchNext={fetchNext}
      header={
        <Distance
          distance={distance}
          onChange={(distance) => setDistance(distance)}
        />
      }
      loading={loading}
      posts={posts}
      refetch={refetch}
    />
  )
}
