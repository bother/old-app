import React, { FunctionComponent } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import Image from 'react-native-fast-image'

import { img_ui_user } from '../assets'
import { colors } from '../styles'

interface Props {
  seed: string
  size?: 'small' | 'large'
  style?: StyleProp<ViewStyle>
  type?: 'comment' | 'post'
  user?: string
}

export const Avatar: FunctionComponent<Props> = ({
  seed,
  size,
  style,
  type,
  user
}) => (
  <>
    <Image
      source={{
        uri: `https://api.adorable.io/avatar/${seed}`
      }}
      style={[style, size === 'large' ? styles.large : styles.small]}
    />
    {user && seed.indexOf(user) === 0 && (
      <View
        style={[
          styles.pill,
          type === 'comment'
            ? styles.comment
            : type === 'post'
            ? styles.post
            : null
        ]}>
        <Image source={img_ui_user} style={styles.icon} />
      </View>
    )}
  </>
)

const styles = StyleSheet.create({
  comment: {
    bottom: -5,
    right: -5
  },
  icon: {
    height: 15,
    width: 15
  },
  large: {
    borderRadius: 100,
    height: 100,
    width: 100
  },
  pill: {
    backgroundColor: colors.background,
    borderRadius: 10,
    position: 'absolute'
  },
  post: {
    bottom: 10,
    right: 10
  },
  small: {
    borderRadius: 30,
    height: 30,
    width: 30
  }
})
