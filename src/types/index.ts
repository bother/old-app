export type Coordinates = {
  latitude: number
  longitude: number
}

export type FirebaseMessage = {
  id: string
  body: string
  receiver: string
  sender: string
  createdAt: string
}

export type FirebaseThread = {
  id: string
  ended: boolean
  receiver: string
  sender: string
  createdAt: string
}
