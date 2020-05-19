import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import update from 'immutability-helper'
import { useCallback } from 'react'

import {
  Comment,
  MutationCreateCommentArgs,
  MutationCreatePostArgs,
  MutationLikePostArgs,
  Post,
  QueryFetchPostArgs
} from '../graphql/types'
import { Coordinates } from '../types'

const FETCH_POST = gql`
  query fetchPost($id: String!) {
    fetchPost(id: $id) {
      id
      body
      liked
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

const LIKE_POST = gql`
  mutation likePost($id: String!) {
    likePost(id: $id) {
      id
      liked
      likes
      __typename
    }
  }
`

interface MutationLikePostPayload {
  likePost: Post
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

const CREATE_COMMENT = gql`
  mutation createComment($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      body
      user {
        id
      }
      createdAt
    }
  }
`

interface MutationCreateCommentPayload {
  createComment: Comment
}

export const usePost = () => {
  const [fetch, fetchQuery] = useLazyQuery<
    QueryFetchPostPayload,
    QueryFetchPostArgs
  >(FETCH_POST)

  const [like, likeMutation] = useMutation<
    MutationLikePostPayload,
    MutationLikePostArgs
  >(LIKE_POST)

  const [create, createMutation] = useMutation<
    MutationCreatePostPayload,
    MutationCreatePostArgs
  >(CREATE_POST)

  const [createComment, replyMutation] = useMutation<
    MutationCreateCommentPayload,
    MutationCreateCommentArgs
  >(CREATE_COMMENT)

  const fetchPost = useCallback(
    (id: string) =>
      fetch({
        variables: {
          id
        }
      }),
    [fetch]
  )

  const likePost = useCallback(
    (id: string) =>
      like({
        variables: {
          id
        }
      }),
    [like]
  )

  const createPost = useCallback(
    (body: string, { latitude, longitude }: Coordinates): Promise<Post> =>
      new Promise((resolve) =>
        create({
          update(proxy, response) {
            if (!response.data?.createPost) {
              return
            }

            resolve(response.data.createPost)
          },
          variables: {
            body,
            coordinates: [longitude, latitude]
          }
        })
      ),
    [create]
  )

  const reply = useCallback(
    (postId: string, body: string) =>
      createComment({
        update(proxy, response) {
          if (!response.data?.createComment) {
            return
          }

          const options = {
            query: FETCH_POST,
            variables: {
              id: postId
            }
          }

          const post = proxy.readQuery<
            QueryFetchPostPayload,
            QueryFetchPostArgs
          >(options)

          if (!post) {
            return
          }

          const data = update(post, {
            fetchPost: {
              comments: {
                $push: [response.data.createComment]
              }
            }
          })

          proxy.writeQuery<QueryFetchPostPayload, QueryFetchPostArgs>({
            ...options,
            data
          })
        },
        variables: {
          body,
          postId
        }
      }),
    [createComment]
  )

  return {
    createPost,
    creating: createMutation.loading,
    fetchPost,
    fetching: fetchQuery.loading,
    likePost,
    liking: likeMutation.loading,
    post: fetchQuery.data?.fetchPost,
    refetch: fetchQuery.refetch,
    reply,
    replying: replyMutation.loading
  }
}
