import { useNavigation } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import Image from 'react-native-fast-image'

import { img_ui_back, img_ui_report, img_ui_share } from '../../assets'
import { Post } from '../../graphql/types'
import { dialog } from '../../lib'
import { colors, layout } from '../../styles'
import { Spinner } from '../spinner'
import { Touchable } from '../touchable'

interface Props {
  flagging: boolean
  post: Post

  onFlag: (id: string, reason: string) => void
}

export const Header: FunctionComponent<Props> = ({
  flagging,
  onFlag,
  post
}) => {
  const { goBack } = useNavigation()

  return (
    <View style={styles.main}>
      <Touchable onPress={() => goBack()} style={styles.back}>
        <Image source={img_ui_back} style={styles.icon} />
      </Touchable>
      <Touchable onPress={() => goBack()}>
        <Image source={img_ui_share} style={styles.icon} />
      </Touchable>
      {flagging ? (
        <Spinner />
      ) : (
        <Touchable
          onPress={async () => {
            const reason = await dialog.flag()

            if (reason) {
              onFlag(post.id, reason)

              goBack()
            }
          }}>
          <Image source={img_ui_report} style={styles.icon} />
        </Touchable>
      )}
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
