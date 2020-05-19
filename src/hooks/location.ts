import Geolocation from '@react-native-community/geolocation'
import { useCallback, useState } from 'react'
import { Alert, Platform } from 'react-native'

import { Coordinates } from '../types'

export const useLocation = () => {
  const [allowed, setAllowed] = useState(true)
  const [loading, setLoading] = useState(true)

  const [coordinates, setCoordinates] = useState<Coordinates>()

  if (Platform.OS === 'ios') {
    Geolocation.requestAuthorization()
  }

  const fetch = useCallback(() => {
    setLoading(true)

    Geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({
          latitude,
          longitude
        })

        setLoading(false)
      },
      (error) => {
        setLoading(false)

        if (error.code === error.PERMISSION_DENIED) {
          setAllowed(false)
        } else {
          Alert.alert('Location error', error.message)
        }
      }
    )
  }, [])

  return {
    allowed,
    coordinates,
    fetch,
    loading
  }
}
