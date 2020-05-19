import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { Button, StyleSheet } from 'react-native'
import Image from 'react-native-fast-image'

import { img_bother } from '../assets'
import { Layout } from '../components'
import { ProfileParams } from '../navigators/profile'
import { layout } from '../styles'

interface Props {
  navigation: StackNavigationProp<ProfileParams, 'Profile'>
  route: RouteProp<ProfileParams, 'Profile'>
}

export const Profile: FunctionComponent<Props> = ({
  navigation: { navigate }
}) => (
  <Layout style={styles.main}>
    <Image source={img_bother} style={styles.logo} />
    <Button
      onPress={() =>
        navigate('Post', {
          id: 'foo'
        })
      }
      title="Post"
    />
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
    justifyContent: 'center'
  }
})
