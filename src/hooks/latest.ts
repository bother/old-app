import { useLazyQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { last } from 'lodash'
import { useCallback } from 'react'

import { Post, QueryLatestArgs } from '../graphql/types'

const LATEST_POSTS = gql`
  query latest($before: String) {
    latest(before: $before) {
      id
      body
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

interface QueryLatestPayload {
  latest: Post[]
}

export const useLatest = () => {
  const [fetchPosts, { data, fetchMore, loading, refetch }] = useLazyQuery<
    QueryLatestPayload,
    QueryLatestArgs
  >(LATEST_POSTS)

  const fetchNext = useCallback(
    () =>
      fetchMore({
        updateQuery: (previous: QueryLatestPayload, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previous
          }

          return {
            latest: [...previous.latest, ...fetchMoreResult.latest]
          }
        },
        variables: {
          before: last(data?.latest)?.createdAt
        }
      }),
    [data?.latest, fetchMore]
  )

  return {
    fetchNext,
    fetchPosts,
    loading,
    posts: data ? data.latest : [],
    refetch
  }
}
