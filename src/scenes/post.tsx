import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect } from 'react'

import { img_hero_not_found } from '../assets'
import { Error, Spinner } from '../components'
import { CommentList } from '../components/comments'
import { Header } from '../components/posts'
import { usePost } from '../hooks'
import { dialog } from '../lib'
import { FeedParams } from '../navigators/feed'

interface Props {
  navigation: StackNavigationProp<FeedParams, 'Post'>
  route: RouteProp<FeedParams, 'Post'>
}

export const Post: FunctionComponent<Props> = ({
  route: {
    params: { id }
  }
}) => {
  const {
    comments,
    fetchPost,
    fetching,
    flagPost,
    flagging,
    post,
    refetch,
    reply,
    replying
  } = usePost()

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
      <Header
        flagging={flagging}
        onFlag={async (id, reason) => {
          await flagPost(id, reason)

          dialog.alert(
            'Thank you',
            'Thank you for reporting. You will see this post again.'
          )
        }}
        post={post}
      />
      <CommentList
        comments={comments}
        loading={fetching}
        onReply={(body) => reply(id, body)}
        post={post}
        refetch={refetch}
        replying={replying}
      />
    </>
  )
}
