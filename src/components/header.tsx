import { StackHeaderProps } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSafeArea } from 'react-native-safe-area-context'

import { img_ui_back } from '../assets'
import { colors, layout, typography } from '../styles'
import { Touchable } from './touchable'

export const Header: FunctionComponent<StackHeaderProps> = ({
  navigation: { goBack },
  previous,
  scene: {
    descriptor: {
      options: { title }
    },
    progress: { current, next }
  }
}) => {
  const { top } = useSafeArea()

  const opacity = Animated.add(current, next ? next : 0).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0]
  })

  const Image = Animated.createAnimatedComponent(FastImage)

  return (
    <View
      style={[
        styles.main,
        {
          height: layout.header + top,
          paddingTop: top
        }
      ]}>
      {previous && (
        <Touchable onPress={() => goBack()} style={styles.back}>
          <Image
            source={img_ui_back}
            style={[
              styles.icon,
              {
                opacity
              }
            ]}
          />
        </Touchable>
      )}
      <Animated.Text
        style={[
          styles.title,
          {
            opacity
          }
        ]}>
        {title}
      </Animated.Text>
    </View>
  )
}

const styles = StyleSheet.create({
  back: {
    alignItems: 'center',
    bottom: 0,
    height: layout.header,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    width: layout.header
  },
  icon: {
    height: layout.icon,
    width: layout.icon
  },
  main: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  title: {
    ...typography.regular,
    ...typography.bold,
    color: colors.foreground,
    margin: layout.margin
  }
})
