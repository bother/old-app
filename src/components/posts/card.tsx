import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Image from 'react-native-fast-image'

import { img_ui_heart, img_ui_heart_empty } from '../../assets'
import { Post } from '../../graphql/types'
import { colors, layout, typography } from '../../styles'
import { Avatar } from '../avatar'
import { Touchable } from '../touchable'

interface Props {
  post: Post
}

export const PostCard: FunctionComponent<Props> = ({ post }) => {
  const { navigate } = useNavigation()

  return (
    <View style={styles.main}>
      <Touchable style={styles.likes}>
        <Image
          source={post.liked ? img_ui_heart : img_ui_heart_empty}
          style={styles.icon}
        />
        <Text style={styles.label}>{post.likes}</Text>
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
          <Avatar seed={post.user.id} />
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
  icon: {
    height: layout.icon,
    width: layout.icon
  },
  label: {
    ...typography.small,
    color: colors.foreground,
    marginTop: layout.padding / 2
  },
  likes: {
    alignItems: 'center',
    backgroundColor: colors.backgroundDark,
    justifyContent: 'center',
    padding: layout.margin
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
