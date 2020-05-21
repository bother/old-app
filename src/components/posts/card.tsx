import { useNavigation } from '@react-navigation/native'
import { uniq } from 'lodash'
import millify from 'millify'
import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Image from 'react-native-fast-image'

import { img_ui_heart } from '../../assets'
import { Post } from '../../graphql/types'
import { usePost } from '../../hooks'
import { useAuth } from '../../store'
import { colors, layout, typography } from '../../styles'
import { Avatar } from '../avatar'
import { Spinner } from '../spinner'
import { Touchable } from '../touchable'

interface Props {
  post: Post
  link?: boolean
}

export const PostCard: FunctionComponent<Props> = ({ link = true, post }) => {
  const { navigate } = useNavigation()

  const [{ userId }] = useAuth()

  const { likePost, liking } = usePost()

  const Details = link ? Touchable : View

  return (
    <View style={styles.main}>
      <View style={styles.sidebar}>
        <Touchable onPress={() => likePost(post.id)} style={styles.likes}>
          <Text style={styles.label}>
            {millify(post.likes, {
              precision: 0
            })}
          </Text>
          {liking ? (
            <Spinner />
          ) : (
            <Image
              source={img_ui_heart}
              style={[styles.heart, post.liked && styles.liked]}
            />
          )}
        </Touchable>
        <Touchable>
          <Avatar
            seed={post.user.id + post.id}
            style={styles.avatar}
            user={userId}
          />
        </Touchable>
      </View>
      <Details
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
      </Details>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: colors.background,
    margin: layout.margin
  },
  body: {
    ...typography.regular,
    color: colors.foreground
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
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
    borderRadius: layout.radius * 2,
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
  sidebar: {
    backgroundColor: colors.backgroundDark,
    justifyContent: 'space-between'
  },
  time: {
    ...typography.small,
    color: colors.foregroundLight,
    marginLeft: layout.padding
  }
})
