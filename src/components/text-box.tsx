import React, { forwardRef } from 'react'
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TextInputProps,
  View
} from 'react-native'

import { colors, layout, typography } from '../styles'

export const TextBox = forwardRef<TextInput, TextInputProps>(
  ({ style, ...props }, ref) => {
    if (props.multiline) {
      return (
        <View style={styles.main}>
          <TextInput
            placeholderTextColor={colors.foregroundLight}
            ref={ref}
            style={[styles.textBox, style, styles.multiline]}
            textAlignVertical="top"
            {...props}
          />
        </View>
      )
    }

    return (
      <TextInput
        placeholderTextColor={colors.foregroundLight}
        ref={ref}
        style={[styles.textBox, style]}
        textAlignVertical="top"
        {...props}
      />
    )
  }
)

const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.backgroundDark,
    borderRadius: layout.radius,
    paddingVertical: layout.padding * 1.5
  },
  multiline: {
    ...typography.base,
    height: height / 4
  },
  textBox: {
    ...typography.base,
    backgroundColor: colors.backgroundDark,
    borderRadius: layout.radius,
    color: colors.foreground,
    height: layout.textBox,
    paddingHorizontal: layout.margin
  }
})
