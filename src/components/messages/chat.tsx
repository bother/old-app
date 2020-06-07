import { useNavigation } from '@react-navigation/native'
import { StackHeaderProps } from '@react-navigation/stack'
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
  const { setOptions } = useNavigation()

  const {
    loading,
    messages,
    reply,
    replying,
    subscribe,
    upload,
    uploading
  } = useThread(thread.id)

  useEffect(() => {
    let unsubscribe = () => {}

    if (!thread.ended) {
      unsubscribe = subscribe()
    }

    return () => {
      unsubscribe()
    }
  }, [subscribe, thread.ended])

  useEffect(() => {
    setOptions({
      header: (props: StackHeaderProps) => (
        <ThreadHeader {...props} thread={thread} />
      ),
      headerShown: true
    })
  }, [setOptions, thread])

  if (loading) {
    return <Spinner full />
  }

  return (
    <>
      <MessageList messages={messages} thread={thread} />
      {thread.ended ? (
        <View style={styles.footer}>
          <Text style={styles.message}>This conversation has ended.</Text>
        </View>
      ) : (
        <Reply
          onReply={(body) => reply(thread.id, body)}
          onUpload={(uri) => upload(thread.id, uri)}
          replying={replying}
          uploading={uploading}
        />
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
