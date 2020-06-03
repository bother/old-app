import firestore from '@react-native-firebase/firestore'
import moment from 'moment'
import { useCallback, useState } from 'react'

import { useAuth } from '../store'
import { Message } from '../types'

export const useThread = () => {
  const [{ userId }] = useAuth()

  const [loading, setLoading] = useState(false)
  const [replying, setReplying] = useState(false)

  const [messages, setMessages] = useState<Message[]>([])

  const fetch = useCallback((id: string) => {
    setLoading(true)

    const unsubscribe = firestore()
      .collection('messages')
      .where('thread', '==', id)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        ({ docs }) => {
          const messages = docs.map((doc) => {
            const data = doc.data()

            return {
              body: data.body,
              createdAt: data.createdAt.toDate().toISOString(),
              id: doc.id,
              receiver: data.receiver,
              sender: data.sender
            }
          })

          setMessages(messages)

          setLoading(false)
        },
        (error) => {
          console.log('error', error)
        }
      )

    return unsubscribe
  }, [])

  const reply = useCallback(
    async (id: string, receiver: string, body: string) => {
      setReplying(true)

      firestore().collection('messages').add({
        body,
        createdAt: moment().toDate(),
        receiver,
        sender: userId,
        thread: id
      })

      setReplying(false)
    },
    [userId]
  )

  return {
    fetch,
    loading,
    messages,
    reply,
    replying
  }
}
