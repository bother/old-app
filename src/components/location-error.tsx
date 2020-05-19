import React, { FunctionComponent } from 'react'
import { StyleSheet, Text } from 'react-native'
import Image from 'react-native-fast-image'

import { img_hero_location } from '../assets'
import { colors, layout, typography } from '../styles'
import { Layout } from './layout'

interface Props {
  message: string
}

export const LocationError: FunctionComponent<Props> = ({ message }) => (
  <Layout style={styles.main}>
    <Image source={img_hero_location} style={styles.image} />
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
