import { Theme } from '@react-navigation/native'

import { colors } from './colors'

export { colors } from './colors'
export { layout } from './layout'
export { typography } from './typography'

export const theme = {
  border: colors.backgroundDark,
  card: colors.backgroundDark,
  primary: colors.primary,
  text: colors.foreground
}

export const navTheme = (route?: string): Theme => ({
  colors: {
    ...theme,
    background:
      route === 'Feed'
        ? colors.screen.feed
        : route === 'Create'
        ? colors.screen.create
        : route === 'Notifications'
        ? colors.screen.notifications
        : route === 'Messages'
        ? colors.screen.messages
        : route === 'Profile'
        ? colors.screen.profile
        : colors.primary
  },
  dark: false
})
