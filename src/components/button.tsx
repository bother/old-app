import React, { FunctionComponent } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle
} from 'react-native'

import { colors, layout, typography } from '../styles'
import { Touchable } from './touchable'

interface Props {
  label: string
  loading?: boolean
  small?: boolean
  style?: ViewStyle | ViewStyle[]
  styleLabel?: TextStyle

  onPress: () => void
}

export const Button: FunctionComponent<Props> = ({
  label,
  loading,
  onPress,
  small,
  style,
  styleLabel
}) => (
  <Touchable
    disabled={loading}
    onPress={onPress}
    style={[styles.main, style, small && styles.small]}>
    {!loading && (
      <Text style={[styles.label, styleLabel, small && styles.smallLabel]}>
        {label}
      </Text>
    )}
    {loading && <ActivityIndicator color={colors.background} size="small" />}
  </Touchable>
)

const styles = StyleSheet.create({
  label: {
    ...typography.regular,
    ...typography.medium,
    color: colors.background
  },
  main: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: layout.radius,
    flexDirection: 'row',
    height: layout.button,
    justifyContent: 'center',
    paddingHorizontal: layout.margin
  },
  small: {
    height: layout.button * 0.75,
    paddingHorizontal: layout.margin * 0.75
  },
  smallLabel: {
    ...typography.small,
    ...typography.medium
  }
})
