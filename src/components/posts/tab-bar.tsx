import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useSafeArea } from 'react-native-safe-area-context'

import { colors, layout, typography } from '../../styles'
import { Touchable } from '../touchable'

export const TabBar: FunctionComponent<MaterialTopTabBarProps> = ({
  navigation,
  position,
  state
}) => {
  const { top } = useSafeArea()

  return (
    <View
      style={[
        styles.main,
        {
          paddingTop: top
        }
      ]}>
      {state.routes.map((route, index) => {
        const inputRange = state.routes.map((_, i) => i)

        const opacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0.2))
        })

        return (
          <Touchable
            key={index}
            onPress={() => {
              const event = navigation.emit({
                canPreventDefault: true,
                target: route.key,
                type: 'tabPress'
              })

              if (state.index !== index && !event.defaultPrevented) {
                navigation.navigate(route.name)
              }
            }}
            style={styles.link}>
            <Animated.Text
              style={[
                styles.label,
                {
                  opacity
                }
              ]}>
              {route.name}
            </Animated.Text>
          </Touchable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    ...typography.subtitle,
    ...typography.bold,
    color: colors.foreground
  },
  link: {
    padding: layout.margin
  },
  main: {
    alignItems: 'center',
    flexDirection: 'row'
  }
})
