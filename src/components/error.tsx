import React, { FunctionComponent } from 'react'
import { StyleSheet, Text } from 'react-native'
import Image, { Source } from 'react-native-fast-image'

import { colors, layout, typography } from '../styles'
import { Layout } from './layout'

interface Props {
  image: Source
  inverted?: boolean
  message: string
}

export const Error: FunctionComponent<Props> = ({
  image,
  inverted,
  message
}) => (
  <Layout style={[styles.main, inverted && styles.inverted]}>
    <Image source={image} style={styles.image} />
    <Text style={styles.message}>{message}</Text>
  </Layout>
)

const styles = StyleSheet.create({
  image: {
    height: layout.hero,
    width: layout.hero
  },
  inverted: {
    transform: [
      {
        scaleY: -1
      }
    ]
  },
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: layout.margin * 2
  },
  message: {
    ...typography.regular,
    color: colors.foreground,
    marginTop: layout.padding,
    textAlign: 'center'
  }
})
