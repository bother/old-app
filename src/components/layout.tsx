import React, { FunctionComponent } from 'react'
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native'

interface Props {
  style?: StyleProp<ViewStyle>
}

export const Layout: FunctionComponent<Props> = ({ children, style }) => (
  <View style={[styles.main, style]}>{children}</View>
)

export const ScrollLayout: FunctionComponent<Props> = ({ children, style }) => (
  <ScrollView
    contentContainerStyle={style}
    keyboardShouldPersistTaps="always"
    style={styles.main}>
    {children}
  </ScrollView>
)

const styles = StyleSheet.create({
  main: {
    flex: 1
  }
})
