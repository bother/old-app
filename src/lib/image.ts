import axios from 'axios'
import FormData from 'form-data'
import { UPLOAD_KEY } from 'react-native-dotenv'
import ImagePicker from 'react-native-image-picker'
import shortid from 'shortid'

class Image {
  async pick(): Promise<string | null> {
    return new Promise((resolve) =>
      ImagePicker.showImagePicker(
        {
          maxHeight: 1000,
          maxWidth: 1000,
          mediaType: 'photo',
          noData: true,
          quality: 0.8,
          title: 'Upload image'
        },
        ({ uri }) => resolve(uri ? uri.replace('file://', '') : null)
      )
    )
  }

  async upload(path: string): Promise<string | null> {
    const body = new FormData()

    body.append('image', {
      name: shortid.generate(),
      uri: path
    })

    try {
      const {
        data: {
          data: {
            image: { url }
          }
        }
      } = await axios.post('https://api.imgbb.com/1/upload', body, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        params: {
          key: UPLOAD_KEY
        }
      })

      return url
    } catch {
      return null
    }
  }
}

export const image = new Image()
