import { useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { last } from 'lodash'
import { useCallback } from 'react'

import { Post, QueryNearbyArgs } from '../graphql/types'
import { Coordinates } from '../types'

const NEARBY_POSTS = gql`
  query nearby($coordinates: [Float!]!, $distance: Int!, $before: String) {
    nearby(coordinates: $coordinates, distance: $distance, before: $before) {
      id
      body
      comments
      liked
      likes
      location {
        city
        country
        state
      }
      user {
        id
      }
      views
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
    ({ latitude, longitude }: Coordinates, distance: number) =>
      fetch({
        variables: {
          coordinates: [longitude, latitude],
          distance
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
