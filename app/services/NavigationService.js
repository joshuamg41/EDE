import { CommonActions, DrawerActions } from '@react-navigation/native';
import React from 'react';
import { Keyboard } from 'react-native';

export const navigationRef = React.createRef();
export const isMountedRef = React.createRef(false);

export const navigate = (name, params) => {
  navigationRef?.current?.dispatch(
    CommonActions.navigate(
      name,
      params,
    )
  );
}

export const jumpTo = (name, params) => {
  navigationRef?.current?.dispatch(
    DrawerActions.jumpTo(
      name,
      params,
    )
  );
}

export const navigateAndReset = (name, params) => {
  if (isMountedRef.current) {
    navigationRef?.current?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name,
            params,
          }
        ],
      })
    );
  }
}

export const goBack = (name, params) => {
  if (isMountedRef.current) {
    navigationRef?.current?.dispatch(CommonActions.goBack());
  }
}

export const toggleDrawer = () => {
  if (isMountedRef.current) {
    Keyboard.dismiss()
    navigationRef?.current?.dispatch(DrawerActions.toggleDrawer())
  }
}

export const closeDrawer = () => {
  if (isMountedRef.current) {
    try {
      Keyboard.dismiss()
      navigationRef?.current?.dispatch(DrawerActions.closeDrawer())
    } catch (e) {
      console.log(e)
    }
  }
}