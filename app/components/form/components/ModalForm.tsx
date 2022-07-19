import {useFormik} from 'formik';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {
  Modal as RNModal,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as yup from 'yup';
import {COLORS, FONTS, METRICS} from '../../../themes';
import {localToArray} from '../../../utils/ArrayUtil';
import {localToObject} from '../../../utils/ObjectUtil';
import {localToString} from '../../../utils/StringUtil';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/StyleHelpers';
import Button from '../../button/Button';
import Content from '../../content/Content';
import ListRender from '../../list-render/ListRender';
import {getFieldValidation} from '../FormFunctions';
import RenderField, {RenderFieldProps} from './RenderField';

const ModalForm: FunctionComponent<ModalPropTypes> = props => {
  const [state, setState] = useState<{[key: string]: string}>({});
  const [schemaValidation, setSchemaValidation] = useState<{
    [key: string]: any;
  }>({});
  const listIndex = localToObject(props.isVisible).listIndex;
  const isModifying = listIndex !== undefined;
  const {
    errors,
    setFieldTouched,
    setFieldValue,
    values,
    touched,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: state,
    onSubmit: (values, actions) => localDoRequest({values, actions}),
    validationSchema: yup.object().shape(schemaValidation),
    enableReinitialize: true,
  });

  useEffect(() => {
    if (props.isVisible && localToArray(props.fields).length > 0) {
      const innerState: {[key: string]: any} = {
        ...state,
        ...localToObject(props.isVisible),
      };
      const innerSchema: {[key: string]: any} = {};
      props.fields.map(field => {
        const validator = getFieldValidation(field);
        if (validator) {
          innerSchema[field.fieldKey] = getFieldValidation(field);
        }
        if (!innerState[field.fieldKey]) {
          innerState[field.fieldKey] = undefined;
        }
      });
      setState(innerState);
      setSchemaValidation(innerSchema);
    }
    return () => {};
  }, [props.isVisible, props.fields]);

  useEffect(() => {
    if (!props.isVisible) {
      resetForm();
      setState({});
    }
    return () => {};
  }, [props.isVisible]);

  //Misc
  const onPress = () => {
    props.onVisibleChange(false);
  };

  const localDoRequest = ({values, actions}: {values: any; actions: any}) => {
    props.doRequest({values, fatherKey: props.fatherKey, listIndex});
  };

  //render
  const LocalRenderGrid = ({
    item,
    index,
  }: {
    item: RenderFieldProps;
    index: number;
  }) => {
    return (
      <RenderField
        {...item}
        fatherValue={values[localToString(item.father_id)]}
        onValueChange={setFieldValue}
        value={values[item.fieldKey]}
        //@ts-ignore
        error={touched[item.fieldKey] && errors[item.fieldKey]}
        setFieldTouched={setFieldTouched}
        changeRule={props.changeRule}
      />
    );
  };

  return (
    <RNModal
      visible={!!props.isVisible}
      transparent={true}
      animationType={'fade'}>
      <Content
        style={Styles.container}
        contentContainerStyle={Styles.outerContent}>
        <View style={Styles.innerContent}>
          <TouchableHighlight
            underlayColor={COLORS.tertiary}
            onPress={onPress}
            style={Styles.closeTouchable}>
            <Ionicons
              name="close"
              color={COLORS.white}
              size={FONTS.smallIcon}
            />
          </TouchableHighlight>
          <ListRender data={props.fields} renderItem={LocalRenderGrid} />
          <Button
            title={isModifying ? 'Guardar' : 'Crear'}
            onPress={handleSubmit}
            bottomSeparate={false}
          />
        </View>
      </Content>
    </RNModal>
  );
};

export interface ModalPropTypes {
  fields: any[];
  onVisibleChange: (val: boolean) => void;
  doRequest: ({
    values,
    fatherKey,
    listIndex,
  }: {
    values: any;
    fatherKey: string;
    listIndex: any;
  }) => void;
  isVisible?: any;
  fatherKey: string;
  changeRule: (rule?: string) => void;
}

ModalForm.defaultProps = {
  isVisible: false,
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryOpacity,
  },
  outerContent: {
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(METRICS.large15),
    paddingVertical: horizontalScale(METRICS.large15),
  },
  innerContent: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    paddingVertical: verticalScale(METRICS.large15),
    paddingHorizontal: horizontalScale(METRICS.large15),
  },
  closeTouchable: {
    position: 'absolute',
    top: moderateScale(-5),
    right: moderateScale(-5),
    backgroundColor: COLORS.error,
    height: moderateScale(30),
    width: moderateScale(30),
    borderRadius: moderateScale(15),
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ModalForm;
