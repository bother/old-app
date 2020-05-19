import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useCallback } from 'react'

import {
  MutationCreatePostArgs,
  Post,
  QueryFetchPostArgs
} from '../graphql/types'
import { Coordinates } from '../types'

const FETCH_POST = gql`
  query fetchPost($id: String!) {
    fetchPost(id: $id) {
      id
      body
      likes
      location {
        city
        state
        country
      }
      comments {
        id
        body
        user {
          id
        }
        createdAt
      }
      user {
        id
      }
      createdAt
    }
  }
`

interface QueryFetchPostPayload {
  fetchPost: Post
}

const CREATE_POST = gql`
  mutation createPost($body: String!, $coordinates: [Float!]!) {
    createPost(body: $body, coordinates: $coordinates) {
      id
    }
  }
`

interface MutationCreatePostPayload {
  createPost: Post
}

export const usePost = () => {
  const [fetch, fetchQuery] = useLazyQuery<
    QueryFetchPostPayload,
    QueryFetchPostArgs
  >(FETCH_POST)

  const [create, createMutation] = useMutation<
    MutationCreatePostPayload,
    MutationCreatePostArgs
  >(CREATE_POST)

  const fetchPost = useCallback(
    (id: string) =>
      fetch({
        variables: {
          id
        }
      }),
    [fetch]
  )

  const createPost = useCallback(
    (body: string, { latitude, longitude }: Coordinates): Promise<Post> =>
      new Promise((resolve) =>
        create({
          update(proxy, response) {
            if (response.data?.createPost) {
              resolve(response.data.createPost)
            }
          },
          variables: {
            body,
            coordinates: [longitude, latitude]
          }
        })
      ),
    [create]
  )

  return {
    createPost,
    creating: createMutation.loading,
    fetchPost,
    fetching: fetchQuery.loading,
    post: fetchQuery.data?.fetchPost
  }
}
