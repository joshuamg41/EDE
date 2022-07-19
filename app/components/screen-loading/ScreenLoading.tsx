import React, { FunctionComponent } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Colors from '../../themes/Colors';
import Loading from '../loading/Loading';
import CheckRender from '../security/CheckRender';

const ScreenLoading: FunctionComponent<propTypes> = props => (
  <View style={Styles.container}>
    <Loading color={Colors.white} size={props.size} isLoading={true} />
    <ActivityIndicator />
    <CheckRender allowed={props.message}>
      <Text style={Styles.text}>
        {props.message}
      </Text>
    </CheckRender>
  </View>
)

interface propTypes {
  size?: number | 'small' | 'large';
  style?: object;
  message?: string | undefined;
}

ScreenLoading.defaultProps = {
  size: 'large',
  style: {},
  message: undefined,
};

const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  },
  text: {
    textAlign: 'center',
    color: Colors.white,
  },
})

export default React.memo(ScreenLoading)