import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import update from 'immutability-helper'
import { useCallback } from 'react'

import { client } from '../graphql'
import {
  Message,
  MutationSendMessageArgs,
  QueryMessagesArgs,
  SubscriptionNewMessageArgs
} from '../graphql/types'
import { QueryThreadsPayload, THREADS } from './messages'

const MESSAGES = gql`
  query messages($threadId: String!) {
    messages(threadId: $threadId) {
      id
      body
      user {
        id
      }
      createdAt
    }
  }
`

interface QueryMessagesPayload {
  messages: Message[]
}

const SEND_MESSAGE = gql`
  mutation sendMessage($threadId: String!, $body: String!) {
    sendMessage(threadId: $threadId, body: $body) {
      id
      body
      user {
        id
      }
      createdAt
    }
  }
`

interface MutationSendMessagePayload {
  sendMessage: Message
}

const NEW_MESSAGE = gql`
  subscription newMessage($threadId: String!) {
    newMessage(threadId: $threadId) {
      id
      body
      user {
        id
      }
      createdAt
    }
  }
`

interface SubscriptionNewMessagePayload {
  newMessage: Message
}

export const useThread = (threadId: string) => {
  const { data, loading, subscribeToMore } = useQuery<
    QueryMessagesPayload,
    QueryMessagesArgs
  >(MESSAGES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      threadId
    }
  })

  const [send, sendMutation] = useMutation<
    MutationSendMessagePayload,
    MutationSendMessageArgs
  >(SEND_MESSAGE, {
    onError(error) {
      if (error.message.includes('conversation is over')) {
        const data = client.readQuery<QueryThreadsPayload>({
          query: THREADS
        })

        if (!data) {
          return
        }

        const index = data.threads.findIndex(({ id }) => id === threadId)

        if (index < 0) {
          return
        }

        client.writeQuery({
          data: update(data, {
            threads: {
              [index]: {
                ended: {
                  $set: true
                }
              }
            }
          }),
          query: THREADS
        })
      }
    }
  })

  const subscribe = useCallback(
    () =>
      subscribeToMore<
        SubscriptionNewMessagePayload,
        SubscriptionNewMessageArgs
      >({
        document: NEW_MESSAGE,
        updateQuery(previous, next) {
          const data = client.readQuery<QueryThreadsPayload>({
            query: THREADS
          })

          if (data) {
            const index = data.threads.findIndex(({ id }) => id === threadId)

            if (index >= 0) {
              client.writeQuery({
                data: update(data, {
                  threads: {
                    [index]: {
                      last: {
                        $set: next.subscriptionData.data.newMessage
                      }
                    }
                  }
                }),
                query: THREADS
              })
            }
          }

          return update(previous, {
            messages: {
              $unshift: [next.subscriptionData.data.newMessage]
            }
          })
        },
        variables: {
          threadId
        }
      }),
    [subscribeToMore, threadId]
  )

  const reply = useCallback(
    async (threadId: string, body: string) => {
      await send({
        variables: {
          body,
          threadId
        }
      })
    },
    [send]
  )

  return {
    loading,
    messages: data?.messages ?? [],
    reply,
    replying: sendMutation.loading,
    subscribe
  }
}
