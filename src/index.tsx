import { ApolloProvider } from '@apollo/react-hooks'
import { NavigationContainer } from '@react-navigation/native'
import React, { FunctionComponent, useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { KeyboardView, Spinner } from './components'
import { client } from './graphql'
import { MainNavigator } from './navigators'
import { Landing } from './scenes'
import { useAuth } from './store'
import { NavigatorTheme } from './styles'

export const Bother: FunctionComponent = () => {
  const [{ initialising, signedIn }, { initialise }] = useAuth()

  useEffect(() => {
    initialise()
  }, [initialise])

  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <KeyboardView>
          <NavigationContainer theme={NavigatorTheme}>
            {signedIn ? (
              <MainNavigator />
            ) : initialising ? (
              <Landing />
            ) : (
              <Spinner full />
            )}
          </NavigationContainer>
        </KeyboardView>
      </ApolloProvider>
    </SafeAreaProvider>
  )
}
