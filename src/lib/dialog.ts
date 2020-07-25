import { Alert } from 'react-native'

class Dialog {
  alert(title: string, message: string): void {
    Alert.alert(title, message)
  }

  confirm(title: string, message: string): Promise<boolean> {
    return new Promise((resolve) =>
      Alert.alert(title, message, [
        {
          onPress: () => resolve(false),
          style: 'cancel',
          text: 'No'
        },
        {
          onPress: () => resolve(true),
          style: 'destructive',
          text: 'Yes'
        }
      ])
    )
  }

  flag(): Promise<string | null> {
    return new Promise((resolve) =>
      Alert.alert(
        'Report',
        'Thank you for reporting. Please pick a reason why you think this post should be flagged. It will also be hidden from your feed.',
        [
          {
            onPress: () => resolve(null),
            style: 'cancel',
            text: 'Cancel'
          },
          {
            onPress: () => resolve('offensive'),
            text: 'Offensive'
          },
          {
            onPress: () => resolve('language'),
            text: 'Inappropriate language'
          },
          {
            onPress: () => resolve('racism'),
            text: 'Racism'
          }
        ]
      )
    )
  }

  endChat(): Promise<string | null> {
    return new Promise((resolve) =>
      Alert.alert(
        'End conversation',
        'Would you like to end this chat or block this user?',
        [
          {
            onPress: () => resolve(null),
            style: 'cancel',
            text: 'Cancel'
          },
          {
            onPress: () => resolve('end'),
            text: 'End conversation'
          },
          {
            onPress: () => resolve('block'),
            text: 'End and block'
          }
        ]
      )
    )
  }
}

export const dialog = new Dialog()
