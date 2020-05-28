import { useNavigation } from '@react-navigation/native'
import React, { FunctionComponent, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Image from 'react-native-fast-image'
import Share from 'react-native-share'

import { img_ui_back, img_ui_report, img_ui_share } from '../../assets'
import { Post } from '../../graphql/types'
import { dialog } from '../../lib'
import { colors, layout } from '../../styles'
import { Spinner } from '../spinner'
import { Touchable } from '../touchable'
import { Shot } from './shot'

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

  const [sharing, setSharing] = useState(false)

  const onShot = async (url: string) => {
    setSharing(false)

    try {
      Share.open({
        url
      })
    } finally {
    }
  }

  return (
    <>
      <View style={styles.main}>
        <Touchable onPress={() => goBack()} style={styles.back}>
          <Image source={img_ui_back} style={styles.icon} />
        </Touchable>
        {sharing ? (
          <Spinner style={styles.icon} />
        ) : (
          <Touchable onPress={() => setSharing(true)}>
            <Image source={img_ui_share} style={styles.icon} />
          </Touchable>
        )}
        {flagging ? (
          <Spinner style={styles.icon} />
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
      {sharing && <Shot onShot={(uri) => onShot(uri)} post={post} />}
    </>
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
