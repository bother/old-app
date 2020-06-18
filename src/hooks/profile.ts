import { useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useCallback } from 'react'

import { AuthResult, Post, Profile } from '../graphql/types'

export const SIGN_UP = gql`
  mutation signUp($deviceId: String!, $pushToken: String) {
    signUp(deviceId: $deviceId, pushToken: $pushToken) {
      token
      user {
        id
      }
    }
  }
`

export interface MutationSignUpPayload {
  signUp: AuthResult
}

export const PROFILE = gql`
  query profile {
    profile {
      id
      notifications
      rating
    }
  }
`

export interface QueryProfilePayload {
  profile: Profile
}

const POSTS = gql`
  query posts($before: String) {
    posts(before: $before) {
      id
      body
      comments
      liked
      likes
      location {
        city
        state
        country
      }
      user {
        id
      }
      views
      createdAt
    }
  }
`

interface QueryPostsPayload {
  posts: Post[]
}

export const useProfile = () => {
  const [fetchProfile, profileQuery] = useLazyQuery<QueryProfilePayload>(
    PROFILE
  )

  const [fetchPosts, postsQuery] = useLazyQuery<QueryPostsPayload>(POSTS)

  const fetch = useCallback(() => {
    fetchProfile()
    fetchPosts()
  }, [fetchPosts, fetchProfile])

  const refetch = useCallback(() => {
    profileQuery.refetch()
    postsQuery.refetch()
  }, [postsQuery, profileQuery])

  return {
    fetch,
    fetchPosts,
    fetchProfile,
    loading: profileQuery.loading || postsQuery.loading,
    posts: postsQuery.data?.posts ?? [],
    refetch,
    refetchPosts: postsQuery.refetch,
    refetchProfile: profileQuery.refetch,
    user: profileQuery.data?.profile
  }
}
