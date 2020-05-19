import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'

import { img_hero_location, img_ui_check } from '../assets'
import {
  Error,
  Header,
  HeaderButton,
  ScrollLayout,
  Spinner,
  TextBox
} from '../components'
import { useLocation, usePost } from '../hooks'
import { CreateParams } from '../navigators/create'
import { layout } from '../styles'

interface Props {
  navigation: StackNavigationProp<CreateParams, 'Create'>
  route: RouteProp<CreateParams, 'Create'>
}

export const Create: FunctionComponent<Props> = ({
  navigation: { navigate, setOptions }
}) => {
  const { createPost, creating } = usePost()
  const { allowed, coordinates, fetchLocation, fetching } = useLocation()

  const [body, setBody] = useState('')

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

                  const { id } = await createPost(body, coordinates)

                  navigate('Post', {
                    id
                  })

                  setBody('')
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

  return (
    <ScrollLayout style={styles.main}>
      <TextBox
        multiline
        onChangeText={(body) => setBody(body)}
        placeholder="What bothers you?"
        value={body}
      />
    </ScrollLayout>
  )
}

const styles = StyleSheet.create({
  main: {
    padding: layout.margin
  }
})
