import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'

import {
  Button,
  LocationError,
  ScrollLayout,
  Spinner,
  TextBox
} from '../components'
import { useLocation, usePost } from '../hooks'
import { CreateParams } from '../navigators/create'
import { layout } from '../styles'

interface Props {
  navigation: StackNavigationProp<CreateParams>
}

export const Create: FunctionComponent<Props> = ({
  navigation: { navigate }
}) => {
  const { createPost, creating } = usePost()
  const { allowed, coordinates, fetchLocation, fetching } = useLocation()

  const [body, setBody] = useState('')

  useEffect(() => {
    fetchLocation()
  }, [fetchLocation])

  if (fetching) {
    return <Spinner full />
  }

  if (!allowed) {
    return <LocationError message="You need to share your location to post." />
  }

  return (
    <ScrollLayout style={styles.main}>
      <TextBox
        multiline
        onChangeText={(body) => setBody(body)}
        placeholder="What bothers you?"
        value={body}
      />
      <Button
        label="Create"
        loading={creating}
        onPress={async () => {
          if (body && coordinates) {
            const { id } = await createPost(body, coordinates)

            setBody('')

            navigate('Post', {
              id
            })
          }
        }}
        style={styles.button}
      />
    </ScrollLayout>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: layout.margin
  },
  main: {
    padding: layout.margin
  }
})
