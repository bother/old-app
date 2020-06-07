import React, { FunctionComponent, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Image from 'react-native-fast-image'

import { img_ui_camera, img_ui_reply } from '../assets'
import { image } from '../lib'
import { colors, layout } from '../styles'
import { Spinner } from './spinner'
import { TextBox } from './text-box'
import { Touchable } from './touchable'

interface Props {
  replying: boolean
  uploading?: boolean

  onReply: (body: string) => void
  onUpload?: (uri: string) => void
}

export const Reply: FunctionComponent<Props> = ({
  onReply,
  onUpload,
  replying,
  uploading
}) => {
  const [body, setBody] = useState<string>()

  const reply = () => {
    if (replying || !body) {
      return
    }

    onReply(body)

    setBody(undefined)
  }

  const upload = async () => {
    if (uploading || !onUpload) {
      return
    }

    const uri = await image.pick()

    if (uri) {
      onUpload(uri)
    }
  }

  return (
    <View style={styles.main}>
      <TextBox
        onChangeText={(body) => setBody(body)}
        onSubmitEditing={reply}
        placeholder="Say something nice"
        returnKeyType="send"
        style={styles.input}
        value={body}
      />
      {onUpload && (
        <Touchable onPress={upload} style={styles.button}>
          {uploading ? (
            <Spinner />
          ) : (
            <Image source={img_ui_camera} style={styles.icon} />
          )}
        </Touchable>
      )}
      <Touchable onPress={reply} style={styles.button}>
        {replying ? (
          <Spinner />
        ) : (
          <Image source={img_ui_reply} style={styles.icon} />
        )}
      </Touchable>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    height: layout.textBox,
    justifyContent: 'center',
    width: layout.textBox
  },
  icon: {
    height: layout.icon,
    width: layout.icon
  },
  input: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    flex: 1
  },
  main: {
    backgroundColor: colors.highlight,
    flexDirection: 'row'
  }
})
