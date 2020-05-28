import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { CommonActions } from '@react-navigation/native'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { Keyboard, StyleSheet, Text, View } from 'react-native'
import Image, { Source } from 'react-native-fast-image'
import { useSafeArea } from 'react-native-safe-area-context'

import {
  img_nav_create,
  img_nav_feed,
  img_nav_notifications,
  img_nav_profile
} from '../assets'
import { colors, layout, typography } from '../styles'
import { Touchable } from './touchable'

const icons: Record<string, Source> = {
  Create: img_nav_create,
  Feed: img_nav_feed,
  Notifications: img_nav_notifications,
  Profile: img_nav_profile
}

interface Props {
  notifications: number
}

export const TabBar: FunctionComponent<Props & BottomTabBarProps> = ({
  navigation: { dispatch, emit },
  notifications,
  state: { index, key, routes }
}) => {
  const { bottom } = useSafeArea()

  const [visible, setVisible] = useState(true)

  useEffect(() => {
    Keyboard.addListener('keyboardWillHide', () => setVisible(true))
    Keyboard.addListener('keyboardWillShow', () => setVisible(false))

    return () => {
      Keyboard.removeListener('keyboardWillHide', () => setVisible(true))
      Keyboard.removeListener('keyboardWillShow', () => setVisible(false))
    }
  }, [])

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
          style={styles.link}>
          <View style={[styles.button, index === active && styles.active]}>
            <Image source={icons[route.name]} style={styles.icon} />
            {route.name === 'Notifications' && notifications > 0 && (
              <View style={styles.notifications}>
                <Text style={styles.count}>
                  {notifications > 99 ? 99 : notifications}
                </Text>
              </View>
            )}
          </View>
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
    opacity: 0.2
  },
  count: {
    ...typography.tiny,
    color: colors.background
  },
  icon: {
    height: layout.icon,
    width: layout.icon
  },
  link: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: layout.margin
  },
  main: {
    backgroundColor: colors.primary,
    flexDirection: 'row'
  },
  notifications: {
    alignItems: 'center',
    backgroundColor: colors.counter.red,
    borderRadius: 16,
    bottom: -8,
    height: 16,
    justifyContent: 'center',
    position: 'absolute',
    right: -8,
    width: 16
  }
})
