import { compact, uniq } from 'lodash'
import millify from 'millify'
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Image from 'react-native-fast-image'
import ViewShot from 'react-native-view-shot'

import { Avatar } from '..'
import { img_ui_heart } from '../../assets'
import { Post } from '../../graphql/types'
import { colors, layout, typography } from '../../styles'

interface Props {
  post: Post

  onShot: (uri: string) => void
}

export const Shot: FunctionComponent<Props> = ({ onShot, post }) => (
  <ViewShot
    captureMode="mount"
    onCapture={(uri) => onShot(uri)}
    style={styles.main}>
    <View style={styles.content}>
      <View style={styles.post}>
        <View style={styles.sidebar}>
          <View style={styles.likes}>
            <Text style={styles.label}>
              {millify(post.likes, {
                precision: 0
              })}
            </Text>
            <Image source={img_ui_heart} style={styles.heart} />
          </View>
          <Avatar seed={post.user.id + post.id} style={styles.avatar} />
        </View>
        <View style={styles.details}>
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
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.bother}>bother.app</Text>
      </View>
    </View>
  </ViewShot>
)

const styles = StyleSheet.create({
  avatar: {
    margin: layout.margin
  },
  body: {
    ...typography.regular,
    color: colors.foreground,
    lineHeight: typography.regular.fontSize * layout.lineHeight,
    marginBottom: 'auto'
  },
  bother: {
    ...typography.regular,
    color: colors.foregroundLight,
    fontSize: typography.small.fontSize
  },
  content: {
    backgroundColor: colors.backgroundDarker,
    borderRadius: layout.radius * 2,
    margin: layout.margin,
    overflow: 'hidden'
  },
  details: {
    flex: 1,
    padding: layout.margin,
    paddingLeft: 0
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: layout.margin
  },
  heart: {
    height: layout.icon,
    width: layout.icon
  },
  label: {
    ...typography.small,
    color: colors.foreground,
    marginBottom: layout.padding / 2
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
    backgroundColor: colors.primary,
    bottom: '100%',
    position: 'absolute',
    width: '100%'
  },
  post: {
    alignItems: 'stretch',
    backgroundColor: colors.background,
    borderRadius: layout.radius * 2,
    flexDirection: 'row',
    overflow: 'hidden'
  },
  sidebar: {
    justifyContent: 'space-between'
  }
})
