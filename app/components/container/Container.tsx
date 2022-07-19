import LottieView from 'lottie-react-native';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useState,
} from 'react';
import {
  Modal as RNModal,
  Platform,
  SafeAreaView,
  StatusBar,
  StatusBarStyle,
  StyleProp,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import Config from 'react-native-config';
import {Lottie} from '../../assets';
import {COLORS, METRICS} from '../../themes';
import {localToNumber} from '../../utils/NumberUtil';
import Button from '../button/Button';
import ModalLoading from '../modal-loading/ModalLoading';
import Modal, {ModalPropTypes} from '../modal/Modal';
import Separator from '../separator/Separator';
import Text from '../text/Text';
import Styles from './ContainerStyles';

const Container: ForwardRefRenderFunction<ContainerRef, ContainerPropTypes> = (
  props,
  ref,
) => {
  const [successVisible, setSuccessVisible] = useState(false);

  //use hooks
  useImperativeHandle(ref, () => ({
    showSuccess: () => {
      setSuccessVisible(true);
      setTimeout(() => {
        setSuccessVisible(false);
        if (typeof props.successFunction == 'function') {
          props.successFunction();
        }
      }, localToNumber(Config.SUCCESS_TIMEOUT, 3000));
    },
  }));

  //misc
  const onPress = () => {
    if (typeof props.modalProps?.onVisibleChange == 'function') {
      props.modalProps?.onVisibleChange(false);
    }
    if (typeof props.errorContinue == 'function') {
      props.errorContinue();
    }
  };

  //render
  return (
    <View
      {...props}
      style={[
        Styles.container,
        {backgroundColor: props.color || COLORS.white},
        props.style,
      ]}>
      <StatusBar
        backgroundColor={props.barColor || COLORS.primary}
        barStyle={
          Platform.OS == 'ios'
            ? 'dark-content'
            : props.barStyle || 'light-content'
        }
      />
      {props.children}
      {/* Modal Error */}
      <Modal {...props.modalProps}>
        <Text theme="bodyMedium" style={Styles.errorTitle}>
          {props.errorTitle || 'Mensaje'}
        </Text>
        <Separator height={METRICS.medium10} />
        <Text style={Styles.errorBody}>{props.errorBody}</Text>
        <Separator />
        <Button
          theme="secondary"
          title="Continuar"
          onPress={onPress}
          bottomSeparate={false}
        />
      </Modal>
      <RNModal
        visible={!!successVisible}
        transparent={true}
        animationType={'fade'}>
        <View style={Styles.outerContent}>
          <View style={Styles.innerContent}>
            <LottieView
              source={
                props.failure ? Lottie.lottie_failure : Lottie.lottie_success
              }
              loop={false}
              resizeMode="contain"
              style={Styles.lottieImage}
              autoPlay
            />
            <Text style={Styles.errorBody}>
              {props.successMessage || 'Completado'}
            </Text>
          </View>
        </View>
      </RNModal>
      <ModalLoading isVisible={props.modalLoading} />
    </View>
  );
};

export interface ContainerRef {
  showSuccess: () => void;
}

interface ContainerPropTypes extends ViewProps {
  color?: string;
  barColor?: string;
  style?: StyleProp<ViewStyle>;
  children?: JSX.Element | JSX.Element[] | undefined;
  barStyle?: null | StatusBarStyle;

  //BasicModal
  modalProps?: ModalPropTypes;
  errorTitle?: string;
  errorBody?: string | boolean;
  errorContinue?: () => void;

  //successModal
  successMessage?: string;
  successFunction?: () => void;
  failure?: boolean;

  //ModalLoading
  modalLoading?: boolean | string;
}

export default forwardRef(Container);
