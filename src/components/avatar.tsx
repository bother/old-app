import React, { FunctionComponent } from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import Image from 'react-native-fast-image'

interface Props {
  seed: string
  size?: 'small' | 'large'
  style?: StyleProp<ViewStyle>
}

export const Avatar: FunctionComponent<Props> = ({ seed, size, style }) => (
  <Image
    source={{
      uri: `https://api.adorable.io/avatar/${seed}`
    }}
    style={[style, size === 'large' ? styles.large : styles.small]}
  />
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
  }
})
