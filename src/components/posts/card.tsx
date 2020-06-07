import { useNavigation } from '@react-navigation/native'
import { compact, uniq } from 'lodash'
import millify from 'millify'
import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Image from 'react-native-fast-image'

import {
  img_ui_comments,
  img_ui_heart,
  img_ui_time,
  img_ui_views
} from '../../assets'
import { Post } from '../../graphql/types'
import { usePost } from '../../hooks'
import { useAuth } from '../../store'
import { colors, layout, typography } from '../../styles'
import { Avatar } from '../avatar'
import { Spinner } from '../spinner'
import { Touchable } from '../touchable'

interface Props {
  link?: boolean
  post: Post
}

export const PostCard: FunctionComponent<Props> = ({ link = true, post }) => {
  const { navigate } = useNavigation()

  const [{ userId }] = useAuth()

  const { likePost, liking } = usePost()

  const Details = link ? Touchable : View
  const Chat = post.user.id === userId ? View : Touchable

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
        <Chat
          onPress={() =>
            navigate('Messages', {
              initial: false,
              params: {
                post: post.id,
                user: post.user.id
              },
              screen: 'Thread'
            })
          }>
          <Avatar
            seed={post.user.id + post.id}
            style={styles.avatar}
            type="post"
            user={userId}
          />
        </Chat>
      </View>
      <Details
        onPress={() =>
          navigate('Feed', {
            initial: false,
            params: {
              id: post.id
            },
            screen: 'Post'
          })
        }
        style={styles.details}>
        <Text style={styles.body}>{post.body}</Text>
        <Text style={styles.location}>
          {uniq(
            compact([
              post.location.city,
              post.location.state,
              post.location.country
            ])
          ).join(', ')}
        </Text>
        <View style={styles.meta}>
          <View style={styles.item}>
            <Image source={img_ui_time} style={styles.icon} />
            <Text style={styles.value}>{moment(post.createdAt).fromNow()}</Text>
          </View>
          <View style={styles.item}>
            <Image source={img_ui_views} style={styles.icon} />
            <Text style={styles.value}>{post.views}</Text>
          </View>
          <View style={styles.item}>
            <Image source={img_ui_comments} style={styles.icon} />
            <Text style={styles.value}>{post.comments}</Text>
          </View>
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
    color: colors.foreground,
    lineHeight: typography.regular.fontSize * layout.lineHeight,
    marginBottom: 'auto'
  },
  details: {
    flex: 1,
    padding: layout.margin
  },
  heart: {
    height: layout.icon,
    opacity: 0.2,
    width: layout.icon
  },
  icon: {
    height: layout.icon * 0.8,
    opacity: 0.2,
    width: layout.icon * 0.8
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: layout.margin
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
    color: colors.foregroundLight,
    marginTop: layout.padding
  },
  main: {
    alignItems: 'stretch',
    backgroundColor: colors.background,
    borderRadius: layout.radius * 2,
    flexDirection: 'row',
    marginHorizontal: layout.margin,
    overflow: 'hidden'
  },
  meta: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: -layout.margin,
    marginTop: layout.margin
  },
  sidebar: {
    backgroundColor: colors.backgroundDark,
    justifyContent: 'space-between'
  },
  value: {
    ...typography.tiny,
    color: colors.foregroundLight,
    marginLeft: layout.padding
  }
})
