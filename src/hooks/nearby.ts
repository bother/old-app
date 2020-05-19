import { useLazyQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { last } from 'lodash'
import { useCallback } from 'react'

import { Post, QueryNearbyArgs } from '../graphql/types'
import { Coordinates } from '../types'

const NEARBY_POSTS = gql`
  query nearby($coordinates: [Float!]!, $before: String) {
    nearby(coordinates: $coordinates, before: $before) {
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

interface QueryNearbyPayload {
  nearby: Post[]
}

export const useNearby = () => {
  const [fetch, { data, fetchMore, loading, refetch }] = useLazyQuery<
    QueryNearbyPayload,
    QueryNearbyArgs
  >(NEARBY_POSTS)

  const fetchPosts = useCallback(
    ({ latitude, longitude }: Coordinates) =>
      fetch({
        variables: {
          coordinates: [longitude, latitude]
        }
      }),
    [fetch]
  )

  const fetchNext = useCallback(
    () =>
      fetchMore({
        updateQuery: (previous: QueryNearbyPayload, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previous
          }

          return {
            nearby: [...previous.nearby, ...fetchMoreResult.nearby]
          }
        },
        variables: {
          before: last(data?.nearby)?.createdAt
        }
      }),
    [data?.nearby, fetchMore]
  )

  return {
    fetchNext,
    fetchPosts,
    loading,
    posts: data ? data.nearby : [],
    refetch
  }
}
