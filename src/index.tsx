import { ApolloProvider } from '@apollo/react-hooks'
import messaging from '@react-native-firebase/messaging'
import { NavigationContainer } from '@react-navigation/native'
import React, { FunctionComponent, useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { KeyboardView } from './components'
import { client } from './graphql'
import { mitter, nav } from './lib'
import { MainNavigator } from './navigators'
import { Landing } from './scenes'
import { useAuth } from './store'
import { NavigatorTheme } from './styles'

export const Bother: FunctionComponent = () => {
  const [{ signedIn }, { signOut }] = useAuth()

  useEffect(() => {
    mitter.on('signout', signOut)

    const unsubscribe = messaging().onNotificationOpenedApp((message) => {
      if (message.data?.deeplink) {
        const [, , action, id] = message.data.deeplink.split('/')

        const route = action === 'post' ? 'Post' : null

        if (!route) {
          return
        }

        nav.current?.navigate(route, {
          id
        })
      }
    })

    return () => {
      mitter.off('signout', signOut)

      unsubscribe()
    }
  }, [signOut])

  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <KeyboardView>
          <NavigationContainer ref={nav} theme={NavigatorTheme}>
            {signedIn ? <MainNavigator /> : <Landing />}
          </NavigationContainer>
        </KeyboardView>
      </ApolloProvider>
    </SafeAreaProvider>
  )
}
