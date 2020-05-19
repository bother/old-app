import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { CommonActions } from '@react-navigation/native'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { Keyboard, Platform, StyleSheet, View } from 'react-native'
import Image, { Source } from 'react-native-fast-image'
import { useSafeArea } from 'react-native-safe-area-context'

import { img_nav_create, img_nav_feed, img_nav_profile } from '../assets'
import { colors, layout } from '../styles'
import { Touchable } from './touchable'

const icons: Record<string, Source> = {
  Create: img_nav_create,
  Feed: img_nav_feed,
  Profile: img_nav_profile
}

export const TabBar: FunctionComponent<BottomTabBarProps> = ({
  navigation: { dispatch, emit },
  state: { index, key, routes }
}) => {
  const { bottom } = useSafeArea()

  const [visible, setVisible] = useState(true)

  useEffect(() => {
    Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setVisible(true)
    )
    Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setVisible(false)
    )

    return () => {
      Keyboard.removeListener(
        Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
        () => setVisible(true)
      )
      Keyboard.removeListener(
        Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
        () => setVisible(false)
      )
    }
  })

  if (!visible) {
    return null
  }

  return (
    <View
      style={[
        styles.main,
        {
          paddingBottom: bottom
        }
      ]}>
      {routes.map((route, active) => (
        <Touchable
          key={active}
          onPress={() => {
            const event = emit({
              canPreventDefault: true,
              target: route.key,
              type: 'tabPress'
            })

            if (index !== active && !event.defaultPrevented) {
              dispatch({
                ...CommonActions.navigate(route.name),
                target: key
              })
            }
          }}
          style={styles.button}>
          <Image
            source={icons[route.name]}
            style={[styles.icon, index === active && styles.active]}
          />
        </Touchable>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  active: {
    opacity: 1
  },
  button: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  icon: {
    height: layout.icon,
    margin: layout.margin,
    opacity: 0.2,
    width: layout.icon
  },
  main: {
    backgroundColor: colors.primary,
    flexDirection: 'row'
  }
})
