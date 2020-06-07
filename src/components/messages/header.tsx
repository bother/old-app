import { useNavigation } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Image from 'react-native-fast-image'
import { useSafeArea } from 'react-native-safe-area-context'

import { img_ui_back, img_ui_end, img_ui_info } from '../../assets'
import { Thread } from '../../graphql/types'
import { useMessages } from '../../hooks'
import { dialog } from '../../lib'
import { useAuth } from '../../store'
import { colors, layout, typography } from '../../styles'
import { Avatar } from '../avatar'
import { Spinner } from '../spinner'
import { Touchable } from '../touchable'

interface Props {
  thread: Thread
}

export const ThreadHeader: FunctionComponent<Props> = ({ thread }) => {
  const { top } = useSafeArea()

  const { goBack, navigate } = useNavigation()

  const [{ userId }] = useAuth()

  const { endThread, ending } = useMessages()

  return (
    <View
      style={[
        styles.main,
        {
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
      />
      <Text style={styles.rating}>
        {(userId === thread.sender.id
          ? thread.receiver.rating
          : thread.sender.rating
        ).toPrecision(2)}
      </Text>
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
            const yes = await dialog.confirm(
              'End chat',
              'Are you sure you want to end this chat?'
            )

            if (!yes) {
              return
            }

            await endThread(thread.id)

            goBack()
          }}
          style={styles.button}>
          <Image source={img_ui_end} style={styles.icon} />
        </Touchable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
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
  },
  rating: {
    ...typography.small,
    ...typography.medium,
    marginLeft: layout.margin,
    marginRight: 'auto'
  }
})
