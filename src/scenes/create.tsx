import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { Keyboard, StyleSheet, Text, View } from 'react-native'

import { img_hero_location, img_ui_check } from '../assets'
import {
  Error,
  Header,
  HeaderButton,
  Layout,
  Spinner,
  TextBox
} from '../components'
import { useLocation, usePost } from '../hooks'
import { CreateParams } from '../navigators/create'
import { colors, layout, typography } from '../styles'

interface Props {
  navigation: StackNavigationProp<CreateParams, 'Create'>
  route: RouteProp<CreateParams, 'Create'>
}

export const Create: FunctionComponent<Props> = ({
  navigation: { navigate, setOptions }
}) => {
  const maxLength = 280
  const minLength = maxLength * 0.3

  const { allowed, coordinates, fetchLocation, fetching } = useLocation()

  const { createPost, creating } = usePost()

  const [body, setBody] = useState<string>()

  useEffect(() => {
    setOptions({
      header: (props) => (
        <Header
          {...props}
          background={colors.screen.create}
          right={
            creating ? (
              <Spinner />
            ) : (
              <HeaderButton
                icon={img_ui_check}
                onPress={async () => {
                  Keyboard.dismiss()

                  if (!body || !coordinates) {
                    return
                  }

                  if (body.length < minLength || body.length > maxLength) {
                    return
                  }

                  const { id } = await createPost(body, coordinates)

                  navigate('Post', {
                    id
                  })

                  setBody(undefined)
                }}
              />
            )
          }
        />
      )
    })
  }, [body, coordinates, createPost, creating, minLength, navigate, setOptions])

  useEffect(() => {
    fetchLocation()
  }, [fetchLocation])

  if (fetching) {
    return <Spinner full />
  }

  if (!allowed) {
    return (
      <Error
        image={img_hero_location}
        message="You need to share your location to post"
      />
    )
  }

  const percent = ((body?.length ?? 0) / maxLength) * 100

  return (
    <Layout style={styles.main}>
      <TextBox
        blurOnSubmit
        containerStyle={styles.input}
        maxLength={maxLength * 2}
        multiline
        onChangeText={(body) => setBody(body)}
        placeholder="What bothers you?"
        style={styles.input}
        value={body}
      />
      <View pointerEvents="none" style={[styles.counter]}>
        <Text
          style={[
            styles.label,
            {
              color:
                percent > 100 || percent < 10
                  ? colors.counter.red
                  : percent > 90 || percent < 20
                  ? colors.counter.orange
                  : percent > 80 || percent < 30
                  ? colors.counter.yellow
                  : colors.counter.green
            }
          ]}>
          {maxLength - (body?.length ?? 0)}
        </Text>
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  counter: {
    bottom: 0,
    marginBottom: layout.margin + layout.padding,
    marginRight: layout.margin + layout.padding,
    position: 'absolute',
    right: 0
  },
  input: {
    borderRadius: layout.radius * 2,
    flex: 1
  },
  label: {
    ...typography.bold,
    fontSize: 12
  },
  main: {
    padding: layout.margin
  }
})
