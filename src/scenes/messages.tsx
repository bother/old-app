import { RouteProp, useFocusEffect } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useCallback } from 'react'

import { ThreadList } from '../components/threads'
import { useThreads } from '../hooks'
import { MessagesParams } from '../navigators/messages'

interface Props {
  navigation: StackNavigationProp<MessagesParams, 'Messages'>
  route: RouteProp<MessagesParams, 'Messages'>
}

export const Messages: FunctionComponent<Props> = () => {
  const { loading, refetch, subscribe, threads } = useThreads()

  useFocusEffect(
    useCallback(() => {
      const unsubcribe = subscribe()

      return () => {
        unsubcribe()
      }
    }, [subscribe])
  )

  return <ThreadList loading={loading} refetch={refetch} threads={threads} />
}
