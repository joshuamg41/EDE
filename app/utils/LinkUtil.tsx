import { Linking } from 'react-native';
import { isValidEmail, isValidPhone, isValidUrl } from './ValidationUtil';
import { IS_IOS } from './StyleHelpers';

const call = (phone: any) => {
  if (isValidPhone(phone)) {
    Linking.openURL(`tel:${phone}`);
  } else {
    console.log('Phone not valid')
  }
};

const openMaps = (latitude: number, longitude: number) => {
  return IS_IOS ? Linking.openURL(`maps:0,0?q=${latitude},${longitude}`) : Linking.openURL(`geo:0,0?q=${latitude},${longitude}`)
};

const sendWAMessage = (phone: any) => {
  Linking.openURL(`whatsapp://send?text=""&phone=${phone}`);
}

const sendEmail = (email: any) => {
  if (isValidEmail(email)) {
    Linking.openURL(`mailto:${email}`);
  } else {
    console.log('Email not valid')
  }
};

const open = (url: any) => {
  if (isValidUrl(url)) {
    Linking.openURL(url);
  } else {
    console.log('url not valid')
  }
};

export default {
  call,
  sendWAMessage,
  sendEmail,
  open,
  openMaps,
};