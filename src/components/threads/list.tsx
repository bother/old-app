import { orderBy } from 'lodash'
import React, { FunctionComponent } from 'react'
import { FlatList, StyleSheet } from 'react-native'

import { img_hero_not_found } from '../../assets'
import { Thread } from '../../graphql/types'
import { layout } from '../../styles'
import { Error } from '../error'
import { Refresher } from '../refresher'
import { Separator } from '../separator'
import { Spinner } from '../spinner'
import { ThreadCard } from './card'

interface Props {
  loading: boolean
  threads: Thread[]

  refetch: () => void
}

export const ThreadList: FunctionComponent<Props> = ({
  loading,
  refetch,
  threads
}) => (
  <FlatList
    ItemSeparatorComponent={Separator}
    ListEmptyComponent={
      threads.length === 0 ? (
        loading ? (
          <Spinner full />
        ) : (
          <Error image={img_hero_not_found} message="No messages" />
        )
      ) : null
    }
    contentContainerStyle={styles.content}
    data={orderBy(threads, 'updatedAt', 'desc')}
    refreshControl={<Refresher onRefresh={refetch} refreshing={loading} />}
    renderItem={({ item }) => <ThreadCard thread={item} />}
  />
)

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingVertical: layout.margin
  }
})
