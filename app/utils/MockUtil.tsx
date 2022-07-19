import Config from 'react-native-config'

export const IS_MOCKED = typeof Config.MOCK !== "string" && Boolean(Config.MOCK) == true