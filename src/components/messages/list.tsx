import React, { FunctionComponent } from 'react'
import { FlatList, StyleSheet } from 'react-native'

import { img_hero_hello } from '../../assets'
import { Thread } from '../../graphql/types'
import { useAuth } from '../../store'
import { layout } from '../../styles'
import { Message } from '../../types'
import { Error } from '../error'
import { MessageCard } from './card'

interface Props {
  messages: Message[]
  thread?: Thread
}

export const MessageList: FunctionComponent<Props> = ({ messages, thread }) => {
  const [{ userId }] = useAuth()

  return (
    <FlatList
      ListEmptyComponent={
        <Error image={img_hero_hello} inverted message="Say hello!" />
      }
      contentContainerStyle={styles.list}
      data={messages}
      inverted
      renderItem={({ item }) => (
        <MessageCard message={item} thread={thread} userId={userId} />
      )}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    paddingVertical: layout.padding
  }
})
