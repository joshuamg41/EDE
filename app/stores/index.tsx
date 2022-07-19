import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import FilesystemStorage from 'redux-persist-filesystem-storage'

import AppReducer from './AppReducers';
import { IS_IOS } from '../utils/StyleHelpers'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]
if (__DEV__) {
  //@ts-ignore
  middlewares.push(logger)
}

const persistConfig = {
  key: 'root',
  storage: IS_IOS ? AsyncStorage : FilesystemStorage,
  whitelist: ['signin'],
  timeout: 10000,
}

const persistedReducer = persistReducer(persistConfig, AppReducer)
let store: any;

export default function configureStore(preloadedState?: any) {
  const composeEnhancers =
    //@ts-ignore
    typeof window === 'object' &&
      //@ts-ignore
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      //@ts-ignore
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionCreators }) :
      compose

  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
  )

  store = createStore(persistedReducer, preloadedState, enhancer)
  const persistor = persistStore(store)
  return {
    persistor,
    runSaga: sagaMiddleware.run,
    store,
  }
}

export { store }
