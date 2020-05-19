import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect } from 'react'
import { StyleSheet, Text } from 'react-native'

import { ScrollLayout, Spinner } from '../components'
import { Header, PostCard } from '../components/posts'
import { usePost } from '../hooks'
import { FeedParams } from '../navigators/feed'
import { layout } from '../styles'

interface Props {
  navigation: StackNavigationProp<FeedParams, 'Post'>
  route: RouteProp<FeedParams, 'Post'>
}

export const Post: FunctionComponent<Props> = ({
  route: {
    params: { id }
  }
}) => {
  const { fetchPost, fetching, post } = usePost()

  useEffect(() => {
    fetchPost(id)
  }, [fetchPost, id])

  if (fetching) {
    return <Spinner full />
  }

  if (!post) {
    return <Text>Post not found</Text>
  }

  return (
    <>
      <Header post={post} />
      <ScrollLayout style={styles.main}>
        <PostCard link={false} post={post} />
      </ScrollLayout>
    </>
  )
}

const styles = StyleSheet.create({
  main: {
    marginTop: layout.padding
  }
})
