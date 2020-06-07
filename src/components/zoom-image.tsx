import React, { FunctionComponent, useState } from 'react'
import {
  Modal,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native'
import Image, { Source } from 'react-native-fast-image'

import { colors, layout } from '../styles'
import { Touchable } from './touchable'

interface Props {
  source: Source
  style?: StyleProp<ViewStyle>
}

export const ZoomImage: FunctionComponent<Props> = ({ source, style }) => {
  const [zoomed, setZoomed] = useState(false)

  return (
    <>
      <Touchable onPress={() => setZoomed(true)}>
        <Image source={source} style={[styles.image, style]} />
      </Touchable>
      {zoomed && (
        <Modal animationType="fade" transparent>
          <TouchableWithoutFeedback onPress={() => setZoomed(false)}>
            <View style={styles.overlay}>
              <Image
                resizeMode="contain"
                source={source}
                style={styles.zoomed}
              />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: colors.highlight,
    borderRadius: layout.radius * 2,
    height: 200,
    width: 200
  },
  overlay: {
    backgroundColor: colors.overlay,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 100
  },
  zoomed: {
    borderRadius: layout.radius * 2,
    flex: 1,
    marginHorizontal: layout.margin * 2,
    marginVertical: layout.margin * 4
  }
})
