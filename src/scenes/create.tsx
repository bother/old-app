import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

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

  const { allowed, coordinates, fetchLocation, fetching } = useLocation()

  const { createPost, creating } = usePost()

  const [body, setBody] = useState<string>()

  useEffect(() => {
    setOptions({
      header: (props) => (
        <Header
          {...props}
          right={
            creating ? (
              <Spinner />
            ) : (
              <HeaderButton
                icon={img_ui_check}
                onPress={async () => {
                  if (!body || !coordinates) {
                    return
                  }

                  if (body.length > maxLength) {
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
  }, [body, coordinates, createPost, creating, navigate, setOptions])

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
                percent > 100
                  ? colors.counter.red
                  : percent > 90
                  ? colors.counter.orange
                  : percent > 80
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
