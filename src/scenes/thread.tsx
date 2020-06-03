import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect } from 'react'

import { Reply, Spinner } from '../components'
import { MessageList } from '../components/messages'
import { useMessages, useThread } from '../hooks'
import { MessagesParams } from '../navigators/messages'

interface Props {
  navigation: StackNavigationProp<MessagesParams, 'Thread'>
  route: RouteProp<MessagesParams, 'Thread'>
}

export const Thread: FunctionComponent<Props> = ({
  navigation: { setParams },
  route: {
    params: { id, post, user }
  }
}) => {
  const {
    createThread,
    creating,
    fetchThread,
    findThread,
    loading: fetching,
    thread
  } = useMessages()

  const { fetch, loading, messages, reply, replying } = useThread()

  useEffect(() => {
    if (id) {
      fetchThread(id)
      fetch(id)
    } else if (thread) {
      fetchThread(thread.id)
      fetch(thread.id)
    }
  }, [fetch, fetchThread, id, thread])

  useEffect(() => {
    if (post) {
      findThread(post)
    }
  }, [findThread, post])

  if (fetching || loading) {
    return <Spinner full />
  }

  return (
    <>
      <MessageList messages={messages} thread={thread} />
      <Reply
        loading={creating || replying}
        onReply={async (body) => {
          if (id && thread) {
            reply(id, thread.receiver.id, body)
          } else if (post && user) {
            const id = await createThread(post, body)

            setParams({
              id,
              user
            })
          }
        }}
      />
    </>
  )
}
