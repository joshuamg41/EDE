import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import Config from 'react-native-config';
import WebView from 'react-native-webview';
import { moderateScale, viewportHeight } from '../../../../utils/StyleHelpers';

const TermsAndConditions: FunctionComponent<TermsAndConditionsPropTypes> = props => {
  return (
    <View>
      <WebView
        source={{ uri: `${Config.WORDPRESS_URL}/terminos-y-condiciones/` }}
        style={Styles.webView}
      />
    </View>
  )
};

export interface TermsAndConditionsPropTypes {
  children?: string | string[] | Element | null;
  setTermsVisible: (bool: boolean) => void;
}

TermsAndConditions.defaultProps = {

}

const Styles = StyleSheet.create({
  webView: { 
    height: viewportHeight - moderateScale(100), 
    width: '100%',
  },
})


export default React.memo(TermsAndConditions);