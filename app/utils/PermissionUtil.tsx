import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform
} from 'react-native';
import AndroidOpenSettings from 'react-native-android-open-settings';

const requestAndroidPermission = async function (permission: any, title: string = "AMCHAMDR", message: string, buttonPositive: string) {
  if (Platform.OS === 'android') {
    try {
      const permissionResponse = await PermissionsAndroid.request(
        permission,
        {
          title,
          message,
          buttonPositive,
        },
      );
      if (permissionResponse === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert('Aviso', message,
          [
            {
              text: 'Cancelar',
              onPress: () => {
              },
              style: 'cancel',
            },
            {
              text: 'Abrir configuraçión',
              onPress: () => {
                openAppPermissionSettings();
              },
            },
          ]);
        return false;
      } else if (permissionResponse !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Aviso', message);
        return false;
      } else {
        return true
      }
    } catch (err) {
      console.error('Failed to request permission ', err);
      return null;
    }
  }
  return null;
};

const openAppPermissionSettings = async function () {
  if (Platform.OS === 'ios') {
    let canOpenUrl = await Linking.canOpenURL('app-settings://');
    if (canOpenUrl) {
      Linking.openURL('app-settings://');
    } else {
      canOpenUrl = await Linking.canOpenURL('App-Prefs://');
      if (canOpenUrl) {
        Linking.openURL('App-Prefs://');
      }
    }
  } else {
    AndroidOpenSettings.appDetailsSettings();
  }
};

export default {
  requestAndroidPermission,
  openAppPermissionSettings,
};