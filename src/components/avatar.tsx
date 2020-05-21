import React, { FunctionComponent } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import Image from 'react-native-fast-image'

import { colors } from '../styles'

interface Props {
  seed: string
  size?: 'small' | 'large'
  style?: StyleProp<ViewStyle>
  user?: string
}

export const Avatar: FunctionComponent<Props> = ({
  seed,
  size,
  style,
  user
}) => (
  <>
    <Image
      source={{
        uri: `https://api.adorable.io/avatar/${seed}`
      }}
      style={[style, size === 'large' ? styles.large : styles.small]}
    />
    {user && seed.indexOf(user) === 0 && <View style={styles.user} />}
  </>
)

const styles = StyleSheet.create({
  large: {
    borderRadius: 100,
    height: 100,
    width: 100
  },
  small: {
    borderRadius: 30,
    height: 30,
    width: 30
  },
  user: {
    backgroundColor: colors.counter.green,
    borderRadius: 10,
    bottom: 15,
    height: 10,
    position: 'absolute',
    right: 15,
    width: 10
  }
})
