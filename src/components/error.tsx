import React, { FunctionComponent } from 'react'
import { StyleSheet, Text } from 'react-native'
import Image, { Source } from 'react-native-fast-image'

import { colors, layout, typography } from '../styles'
import { Layout } from './layout'

interface Props {
  image: Source
  message: string
}

export const Error: FunctionComponent<Props> = ({ image, message }) => (
  <Layout style={styles.main}>
    <Image source={image} style={styles.image} />
    <Text style={styles.message}>{message}</Text>
  </Layout>
)

const styles = StyleSheet.create({
  image: {
    height: layout.hero,
    width: layout.hero
  },
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  message: {
    ...typography.regular,
    color: colors.foreground,
    marginHorizontal: layout.margin * 2,
    marginTop: layout.margin,
    textAlign: 'center'
  }
})
