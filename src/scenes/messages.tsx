import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect } from 'react'

import { ThreadList } from '../components/threads'
import { useMessages } from '../hooks'
import { MessagesParams } from '../navigators/messages'

interface Props {
  navigation: StackNavigationProp<MessagesParams, 'Messages'>
  route: RouteProp<MessagesParams, 'Messages'>
}

export const Messages: FunctionComponent<Props> = () => {
  const { fetch, loading, refetch, threads } = useMessages()

  useEffect(() => {
    fetch()
  }, [fetch])

  return <ThreadList loading={loading} refetch={refetch} threads={threads} />
}
