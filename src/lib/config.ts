import remoteConfig from '@react-native-firebase/remote-config'

class Config {
  config: Record<string, string | number | boolean | undefined> = {}

  async init(): Promise<void> {
    await remoteConfig().fetchAndActivate()

    const data = remoteConfig().getAll()

    Object.entries(data).forEach(([key, { value }]) => {
      this.config[key] = value
    })
  }
}

export const config = new Config()
