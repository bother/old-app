import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useCallback } from 'react'

import {
  MutationCreateThreadArgs,
  QueryFindThreadArgs,
  QueryThreadArgs,
  Thread
} from '../graphql/types'

const THREADS = gql`
  query threads {
    threads {
      id
      last
      post {
        id
      }
      sender {
        id
      }
      receiver {
        id
      }
      createdAt
      updatedAt
    }
  }
`

interface QueryThreadsPayload {
  threads: Thread[]
}

const THREAD = gql`
  query thread($id: String!) {
    thread(id: $id) {
      id
      last
      post {
        id
      }
      sender {
        id
      }
      receiver {
        id
      }
      createdAt
      updatedAt
    }
  }
`

interface QueryThreadPayload {
  thread: Thread
}

const FIND_THREAD = gql`
  query findThread($postId: String!) {
    findThread(postId: $postId) {
      id
      last
      post {
        id
      }
      sender {
        id
      }
      receiver {
        id
      }
      createdAt
      updatedAt
    }
  }
`

interface QueryFindThreadPayload {
  findThread: Thread
}

const CREATE_THREAD = gql`
  mutation createThread($postId: String!, $body: String!) {
    createThread(postId: $postId, body: $body) {
      id
    }
  }
`

interface MutationCreateThreadPayload {
  createThread: Thread
}

export const useMessages = () => {
  const [fetch, { data, loading, refetch }] = useLazyQuery<QueryThreadsPayload>(
    THREADS
  )

  const [fetchOne, fetchOneQuery] = useLazyQuery<
    QueryThreadPayload,
    QueryThreadArgs
  >(THREAD)

  const [findOne, findOneQuery] = useLazyQuery<
    QueryFindThreadPayload,
    QueryFindThreadArgs
  >(FIND_THREAD)

  const [create, createMutation] = useMutation<
    MutationCreateThreadPayload,
    MutationCreateThreadArgs
  >(CREATE_THREAD)

  const fetchThread = useCallback(
    (id: string) =>
      fetchOne({
        variables: {
          id
        }
      }),
    [fetchOne]
  )

  const findThread = useCallback(
    (postId: string) =>
      findOne({
        variables: {
          postId
        }
      }),
    [findOne]
  )

  const createThread = useCallback(
    async (postId: string, body: string) => {
      const response = await create({
        variables: {
          body,
          postId
        }
      })

      return response.data?.createThread.id
    },
    [create]
  )

  return {
    createThread,
    creating: createMutation.loading,
    fetch,
    fetchThread,
    findThread,
    loading: loading || fetchOneQuery.loading || findOneQuery.loading,
    refetch,
    thread: fetchOneQuery.data?.thread || findOneQuery.data?.findThread,
    threads: data ? data.threads : []
  }
}
