import OneSignal from 'react-native-onesignal';
import { navigateAndReset } from '../services/NavigationService';
import { AppState } from 'react-native';

export default function* startup() {
  // Verify is the user is logged
  console.log('StartupSaga')
  OneSignal.setLogLevel(6, 0);
  OneSignal.setAppId("90594f28-1562-4f0f-af14-85e718bc6781");
  OneSignal.setNotificationOpenedHandler(notification => {
    const appState = AppState.currentState
    if (['active', 'background'].includes(appState)) {
      navigateAndReset('Notification')
    } else {
      navigateAndReset('SplashScreen', { from: 'Notification' })
    }
  });
}