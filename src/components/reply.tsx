import React, { FunctionComponent, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Image from 'react-native-fast-image'

import { img_ui_reply } from '../assets'
import { colors, layout } from '../styles'
import { Spinner } from './spinner'
import { TextBox } from './text-box'
import { Touchable } from './touchable'

interface Props {
  loading: boolean

  onReply: (body: string) => void
}

export const Reply: FunctionComponent<Props> = ({ loading, onReply }) => {
  const [body, setBody] = useState<string>()

  const reply = () => {
    if (body) {
      onReply(body)

      setBody(undefined)
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
      <Touchable onPress={reply} style={styles.button}>
        {loading ? (
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
