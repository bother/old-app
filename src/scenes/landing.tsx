import React, { FunctionComponent, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import Image from 'react-native-fast-image'

import { img_bother } from '../assets'
import { Layout, Spinner } from '../components'
import { useAuth } from '../store'
import { colors, layout } from '../styles'

export const Landing: FunctionComponent = () => {
  const [, { init }] = useAuth()

  useEffect(() => {
    init()
  }, [init])

  return (
    <Layout style={styles.main}>
      <Image source={img_bother} style={styles.logo} />
      <Spinner />
    </Layout>
  )
}

const styles = StyleSheet.create({
  logo: {
    height: layout.hero,
    marginBottom: layout.margin * 2,
    width: layout.hero
  },
  main: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: 'center'
  }
})
