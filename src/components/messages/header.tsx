import { useNavigation } from '@react-navigation/native'
import { StackHeaderProps } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { Animated, StyleSheet } from 'react-native'
import Image from 'react-native-fast-image'
import { useSafeArea } from 'react-native-safe-area-context'

import { img_ui_back, img_ui_end, img_ui_info } from '../../assets'
import { Thread } from '../../graphql/types'
import { useMessages } from '../../hooks'
import { dialog } from '../../lib'
import { useAuth } from '../../store'
import { colors, layout } from '../../styles'
import { Avatar } from '../avatar'
import { Spinner } from '../spinner'
import { Touchable } from '../touchable'

interface Props {
  thread: Thread
}

export const ThreadHeader: FunctionComponent<StackHeaderProps & Props> = ({
  scene: {
    progress: { current, next }
  },
  thread
}) => {
  const { top } = useSafeArea()

  const { goBack, navigate } = useNavigation()

  const [{ userId }] = useAuth()

  const { endThread, ending } = useMessages()

  const opacity = Animated.add(current, next ? next : 0).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0]
  })

  return (
    <Animated.View
      style={[
        styles.main,
        {
          height: layout.header + top,
          opacity,
          paddingTop: top
        }
      ]}>
      <Touchable onPress={() => goBack()} style={styles.button}>
        <Image source={img_ui_back} style={styles.icon} />
      </Touchable>
      <Avatar
        seed={
          (userId === thread.sender.id
            ? thread.receiver.id
            : thread.sender.id) + thread.post.id
        }
        style={styles.avatar}
      />
      <Touchable
        onPress={() =>
          navigate('Feed', {
            initial: false,
            params: {
              id: thread.post.id
            },
            screen: 'Post'
          })
        }
        style={styles.button}>
        <Image source={img_ui_info} style={styles.icon} />
      </Touchable>
      {thread.ended ? null : ending ? (
        <Spinner style={styles.icon} />
      ) : (
        <Touchable
          onPress={async () => {
            const action = await dialog.endChat()

            if (!action) {
              return
            }

            endThread(thread.id, action === 'block')

            goBack()
          }}
          style={styles.button}>
          <Image source={img_ui_end} style={styles.icon} />
        </Touchable>
      )}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    marginRight: 'auto'
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  icon: {
    height: layout.icon,
    margin: layout.margin,
    width: layout.icon
  },
  main: {
    alignItems: 'center',
    backgroundColor: colors.highlight,
    flexDirection: 'row'
  }
})
