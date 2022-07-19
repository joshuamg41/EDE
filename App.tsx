import React from 'react';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RootScreen from './app/containers/root/RootScreen';
import LoadingImage from './app/containers/root/splash-screen/components/LoadingImage';
import rootSaga from './app/sagas';
import configureStore from './app/stores';
enableScreens(true);

const { runSaga, store, persistor } = configureStore();
runSaga(rootSaga);

const App = () => (
  <Provider store={store}>
    <PersistGate loading={<LoadingImage />} persistor={persistor}>
      <RootScreen />
    </PersistGate>
  </Provider>
);

export default App