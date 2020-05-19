import { useLazyQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { last, uniqBy } from 'lodash'

import { Post, QueryPopularArgs } from '../graphql/types'

const POPULAR_POSTS = gql`
  query popular($before: String) {
    popular(before: $before) {
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

interface QueryPopularPayload {
  popular: Post[]
}

export const usePopular = () => {
  const [fetch, { data, fetchMore, loading, refetch }] = useLazyQuery<
    QueryPopularPayload,
    QueryPopularArgs
  >(POPULAR_POSTS)

  return {
    fetch,
    fetchMore: () =>
      fetchMore({
        updateQuery: (previous: QueryPopularPayload, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previous
          }

          return {
            popular: uniqBy(
              [...previous.popular, ...fetchMoreResult.popular],
              'id'
            )
          }
        },
        variables: {
          before: last(data?.popular)?.createdAt
        }
      }),
    loading,
    posts: data ? data.popular : [],
    refetch
  }
}
