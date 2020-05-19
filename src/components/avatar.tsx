import React, { FunctionComponent } from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import Image from 'react-native-fast-image'

interface Props {
  seed: string
  size?: 'small' | 'large'
  style?: ViewStyle
}

export const Avatar: FunctionComponent<Props> = ({ seed, size, style }) => (
  <Image
    source={{
      uri: `https://api.adorable.io/avatar/${seed}`
    }}
    style={[styles.main, style, size === 'large' ? styles.large : styles.small]}
  />
)

const styles = StyleSheet.create({
  large: {
    borderRadius: 100,
    height: 100,
    width: 100
  },
  main: {},
  small: {
    borderRadius: 20,
    height: 20,
    width: 20
  }
})
