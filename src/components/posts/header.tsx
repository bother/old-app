import { useNavigation } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import Image from 'react-native-fast-image'

import { img_ui_back, img_ui_report, img_ui_share } from '../../assets'
import { Post } from '../../graphql/types'
import { colors, layout } from '../../styles'
import { Touchable } from '../touchable'

interface Props {
  post: Post
}

export const Header: FunctionComponent<Props> = ({}) => {
  const { goBack } = useNavigation()

  return (
    <View style={styles.main}>
      <Touchable onPress={() => goBack()} style={styles.back}>
        <Image source={img_ui_back} style={styles.icon} />
      </Touchable>
      <Touchable onPress={() => goBack()}>
        <Image source={img_ui_share} style={styles.icon} />
      </Touchable>
      <Touchable onPress={() => goBack()}>
        <Image source={img_ui_report} style={styles.icon} />
      </Touchable>
    </View>
  )
}

const styles = StyleSheet.create({
  back: {
    marginRight: 'auto'
  },
  icon: {
    height: layout.icon,
    margin: layout.margin,
    width: layout.icon
  },
  main: {
    backgroundColor: colors.primaryDark,
    flexDirection: 'row'
  }
})
