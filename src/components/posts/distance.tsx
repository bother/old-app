import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors, layout, typography } from '../../styles'
import { Touchable } from '../touchable'

interface Props {
  distance: number

  onChange: (distance: number) => void
}

export const Distance: FunctionComponent<Props> = ({ distance, onChange }) => (
  <View style={styles.main}>
    {[10, 20, 50, 100].map((value, index) => (
      <Touchable
        key={index}
        onPress={() => onChange(value)}
        style={styles.link}>
        <Text style={[styles.value, distance === value && styles.active]}>
          {value} km
        </Text>
      </Touchable>
    ))}
  </View>
)

const styles = StyleSheet.create({
  active: {
    ...typography.bold,
    opacity: 1
  },
  link: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    padding: layout.margin
  },
  main: {
    backgroundColor: colors.background,
    borderRadius: layout.radius * 2,
    flexDirection: 'row',
    marginBottom: layout.margin,
    marginHorizontal: layout.margin
  },
  value: {
    ...typography.regular,
    opacity: 0.5
  }
})
