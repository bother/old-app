import React, { FunctionComponent, useState } from 'react'
import {
  Modal,
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native'
import Image, { Source } from 'react-native-fast-image'
import { useSafeArea } from 'react-native-safe-area-context'

import { img_ui_download } from '../assets'
import { image } from '../lib'
import { colors, layout, typography } from '../styles'
import { Spinner } from './spinner'
import { Touchable } from './touchable'

interface Props {
  source: Source
  style?: StyleProp<ViewStyle>
}

export const ZoomImage: FunctionComponent<Props> = ({ source, style }) => {
  const { bottom } = useSafeArea()

  const [zoomed, setZoomed] = useState(false)
  const [downloading, setDownloading] = useState(false)

  return (
    <>
      <Touchable onPress={() => setZoomed(true)}>
        <Image source={source} style={[styles.image, style]} />
      </Touchable>
      {zoomed && (
        <Modal animationType="fade" transparent>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={() => setZoomed(false)}>
              <Image
                resizeMode="contain"
                source={source}
                style={styles.zoomed}
              />
            </TouchableWithoutFeedback>
            <Touchable
              onPress={async () => {
                if (downloading) {
                  return
                }

                if (source.uri) {
                  setDownloading(true)

                  await image.download(source.uri)

                  setDownloading(false)
                }
              }}
              style={[
                styles.button,
                downloading && styles.spinner,
                {
                  marginBottom: bottom
                }
              ]}>
              {downloading ? (
                <Spinner color={colors.background} />
              ) : (
                <>
                  <Image source={img_ui_download} style={styles.icon} />
                  <Text style={styles.label}>Download</Text>
                </>
              )}
            </Touchable>
          </View>
        </Modal>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.overlay,
    borderRadius: layout.radius * 2,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: layout.margin * 0.6,
    paddingVertical: layout.padding
  },
  icon: {
    height: layout.icon,
    width: layout.icon
  },
  image: {
    backgroundColor: colors.highlight,
    borderRadius: layout.radius * 2,
    height: 200,
    width: 200
  },
  label: {
    ...typography.small,
    ...typography.medium,
    color: colors.background,
    marginLeft: layout.padding
  },
  overlay: {
    backgroundColor: colors.overlay,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  },
  spinner: {
    borderRadius: 200
  },
  zoomed: {
    flex: 1,
    marginBottom: layout.margin * 2,
    marginHorizontal: layout.margin * 2,
    marginTop: layout.margin * 4
  }
})
