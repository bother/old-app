import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { Button, StyleSheet } from 'react-native'
import Image from 'react-native-fast-image'

import { img_bother } from '../assets'
import { Layout } from '../components'
import { PostsParams } from '../navigators/posts'
import { layout } from '../styles'

interface Props {
  navigation: StackNavigationProp<PostsParams>
}

export const Latest: FunctionComponent<Props> = ({
  navigation: { navigate }
}) => (
  <Layout style={styles.main}>
    <Image source={img_bother} style={styles.logo} />
    <Button onPress={() => navigate('Post')} title="Post" />
  </Layout>
)

const styles = StyleSheet.create({
  logo: {
    height: layout.hero,
    marginBottom: layout.margin,
    width: layout.hero
  },
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
})
