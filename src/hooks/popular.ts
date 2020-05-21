import { useLazyQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import { Post } from '../graphql/types'

const POPULAR_POSTS = gql`
  query popular {
    popular {
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

interface QueryPopularPayload {
  popular: Post[]
}

export const usePopular = () => {
  const [fetchPosts, { data, loading, refetch }] = useLazyQuery<
    QueryPopularPayload
  >(POPULAR_POSTS)

  return {
    fetchPosts,
    loading,
    posts: data ? data.popular : [],
    refetch
  }
}
