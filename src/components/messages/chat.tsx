import React, { FunctionComponent, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Reply, Spinner } from '../../components'
import { Thread } from '../../graphql/types'
import { useThread } from '../../hooks'
import { colors, layout, typography } from '../../styles'
import { ThreadHeader } from './header'
import { MessageList } from './list'

interface Props {
  thread: Thread
}

export const Chat: FunctionComponent<Props> = ({ thread }) => {
  const { loading, messages, reply, replying, subscribe } = useThread(thread.id)

  useEffect(() => {
    let unsubscribe = () => {}

    if (!thread.ended) {
      unsubscribe = subscribe()
    }

    return () => {
      unsubscribe()
    }
  }, [subscribe, thread.ended])

  if (loading) {
    return <Spinner full />
  }

  return (
    <>
      <ThreadHeader thread={thread} />
      <MessageList messages={messages} thread={thread} />
      {thread.ended ? (
        <View style={styles.footer}>
          <Text style={styles.message}>This conversation has ended.</Text>
        </View>
      ) : (
        <Reply loading={replying} onReply={(body) => reply(thread.id, body)} />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    backgroundColor: colors.highlight,
    padding: layout.margin
  },
  message: {
    ...typography.small
  }
})
