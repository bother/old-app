import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect } from 'react'
import { StyleSheet } from 'react-native'

import { img_hero_not_found } from '../assets'
import { Error, Layout, Spinner } from '../components'
import { Comments } from '../components/comments'
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
  const { fetchPost, fetching, post, refetch, reply, replying } = usePost()

  useEffect(() => {
    fetchPost(id)
  }, [fetchPost, id])

  if (fetching) {
    return <Spinner full />
  }

  if (!post) {
    return <Error image={img_hero_not_found} message="Post not found" />
  }

  return (
    <>
      <Header post={post} />
      <Layout style={styles.main}>
        <PostCard link={false} post={post} />
        <Comments
          comments={post.comments}
          loading={fetching}
          onReply={(body) => reply(id, body)}
          refetch={refetch}
          replying={replying}
        />
      </Layout>
    </>
  )
}

const styles = StyleSheet.create({
  main: {
    marginTop: layout.padding
  }
})
