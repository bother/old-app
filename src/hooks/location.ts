import Geolocation from '@react-native-community/geolocation'
import { useCallback, useState } from 'react'
import { Alert, Platform } from 'react-native'

import { Coordinates } from '../types'

export const useLocation = () => {
  const [allowed, setAllowed] = useState(true)
  const [fetching, setFetching] = useState(true)

  const [coordinates, setCoordinates] = useState<Coordinates>()

  if (Platform.OS === 'ios') {
    Geolocation.requestAuthorization()
  }

  const fetchLocation = useCallback(() => {
    setFetching(true)

    Geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({
          latitude,
          longitude
        })

        setFetching(false)
      },
      (error) => {
        setFetching(false)

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
    fetchLocation,
    fetching
  }
}
