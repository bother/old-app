import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect } from 'react'

import { img_hero_hello, img_hero_not_found } from '../assets'
import { Error, Reply, Spinner } from '../components'
import { Chat } from '../components/messages'
import { useMessages } from '../hooks'
import { MessagesParams } from '../navigators/messages'

interface Props {
  navigation: StackNavigationProp<MessagesParams, 'Thread'>
  route: RouteProp<MessagesParams, 'Thread'>
}

export const Thread: FunctionComponent<Props> = ({
  navigation: { setParams },
  route: {
    params: { id, post }
  }
}) => {
  const {
    createThread,
    creating,
    fetchThread,
    findThread,
    loading,
    thread
  } = useMessages()

  useEffect(() => {
    if (id) {
      fetchThread(id)
    }
  }, [fetchThread, id])

  useEffect(() => {
    if (post) {
      findThread(post)
    }
  }, [findThread, post])

  if (loading) {
    return <Spinner full />
  }

  if (!thread) {
    if (post) {
      return (
        <>
          <Error image={img_hero_hello} message="Say hello!" />
          <Reply
            loading={creating}
            onReply={async (body) => {
              const id = await createThread(post, body)

              setParams({
                id
              })
            }}
          />
        </>
      )
    } else {
      return <Error image={img_hero_not_found} message="Thread not found" />
    }
  }

  return <Chat thread={thread} />
}
