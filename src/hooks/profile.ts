import { useLazyQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useCallback } from 'react'

import { Post, User } from '../graphql/types'

const PROFILE = gql`
  query profile {
    profile {
      id
      rating
    }
  }
`

interface QueryProfilePayload {
  profile: User
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
    loading: profileQuery.loading || postsQuery.loading,
    posts: postsQuery.data?.posts ?? [],
    refetch,
    user: profileQuery.data?.profile
  }
}
