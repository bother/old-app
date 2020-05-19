import { useNavigation } from '@react-navigation/native'
import { uniq } from 'lodash'
import millify from 'millify'
import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Image from 'react-native-fast-image'

import { img_ui_heart } from '../../assets'
import { Post } from '../../graphql/types'
import { colors, layout, typography } from '../../styles'
import { Touchable } from '../touchable'

interface Props {
  post: Post
}

export const PostCard: FunctionComponent<Props> = ({ post }) => {
  const { navigate } = useNavigation()

  return (
    <View style={styles.main}>
      <Touchable style={styles.likes}>
        <Text style={styles.label}>
          {millify(post.likes, {
            precision: 0
          })}
        </Text>
        <Image
          source={img_ui_heart}
          style={[styles.heart, post.liked && styles.liked]}
        />
      </Touchable>
      <Touchable
        onPress={() =>
          navigate('Post', {
            id: post.id
          })
        }
        style={styles.details}>
        <Text style={styles.body}>{post.body}</Text>
        <View style={styles.meta}>
          <Text style={styles.location}>
            {uniq([
              post.location.city,
              post.location.state,
              post.location.country
            ]).join(', ')}
          </Text>
          <Text style={styles.time}>{moment(post.createdAt).fromNow()}</Text>
        </View>
      </Touchable>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    ...typography.regular,
    color: colors.foreground
  },
  details: {
    flex: 1,
    justifyContent: 'center',
    padding: layout.margin
  },
  heart: {
    height: layout.icon,
    opacity: 0.2,
    width: layout.icon
  },
  label: {
    ...typography.small,
    color: colors.foreground,
    marginBottom: layout.padding / 2
  },
  liked: {
    opacity: 1
  },
  likes: {
    alignItems: 'center',
    backgroundColor: colors.backgroundDark,
    justifyContent: 'center',
    padding: layout.margin
  },
  location: {
    ...typography.small,
    color: colors.foregroundLight
  },
  main: {
    alignItems: 'stretch',
    backgroundColor: colors.background,
    borderRadius: layout.radius,
    flexDirection: 'row',
    marginHorizontal: layout.margin,
    marginVertical: layout.padding,
    overflow: 'hidden'
  },
  meta: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: layout.padding
  },
  time: {
    ...typography.small,
    color: colors.foregroundLight,
    marginLeft: layout.padding
  }
})
