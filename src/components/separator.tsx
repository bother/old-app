import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'

import { layout } from '../styles'

export const Separator: FunctionComponent = () => <View style={styles.main} />

const styles = StyleSheet.create({
  main: {
    height: layout.margin
  }
})
