import React, { FunctionComponent } from 'react';
import { ActivityIndicator, Modal as RNModal, View } from 'react-native';
import { COLORS, METRICS } from '../../themes';
import { moderateScale } from '../../utils/StyleHelpers';
import Content from '../content/Content';
import Styles from './ModalLoadingStyles';

const ModalLoading: FunctionComponent<propTypes> = props => (
  <RNModal
    {...props}
    visible={!!props.isVisible}
    transparent={true}
    animationType={"fade"}
  >
    <Content
      style={Styles.container}
      contentContainerStyle={Styles.outerContent}
    >
      <View style={Styles.innerContent}>
        <ActivityIndicator
          color={COLORS.white}
          size={moderateScale(35)}
        />
      </View>
    </Content>
  </RNModal>
)

interface propTypes {
  isVisible?: boolean | string;
}

ModalLoading.defaultProps = {

};

export default React.memo(ModalLoading)