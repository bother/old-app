import React, { FunctionComponent } from 'react'
import { FlatList, StyleSheet } from 'react-native'

import { img_hero_not_found } from '../../assets'
import { Notification } from '../../graphql/types'
import { layout } from '../../styles'
import { Error } from '../error'
import { Refresher } from '../refresher'
import { Spinner } from '../spinner'
import { NotificationCard } from './card'

interface Props {
  loading: boolean
  notifications: Notification[]

  refetch: () => void
}

export const NotificationList: FunctionComponent<Props> = ({
  loading,
  notifications,
  refetch
}) => (
  <FlatList
    ListEmptyComponent={
      loading ? (
        <Spinner full />
      ) : (
        <Error image={img_hero_not_found} message="No notifications" />
      )
    }
    contentContainerStyle={styles.content}
    data={notifications}
    refreshControl={<Refresher onRefresh={refetch} refreshing={loading} />}
    renderItem={({ item }) => <NotificationCard notification={item} />}
    style={styles.main}
  />
)

const styles = StyleSheet.create({
  content: {
    flexGrow: 1
  },
  main: {
    paddingVertical: layout.padding
  }
})
