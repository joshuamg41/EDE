import { useFormik } from 'formik';
import React, { FunctionComponent, useEffect, useRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect, ConnectedProps } from 'react-redux';
import * as yup from 'yup';
import Button from '../../../../components/button/Button';
import Input from '../../../../components/Input/Input';
import Modal from '../../../../components/modal/Modal';
import Separator from '../../../../components/separator/Separator';
import Text from '../../../../components/text/Text';
import { RootState } from '../../../../stores/AppReducers';
import ProfileMainActions from "../../../../stores/profile/main/Actions";
import { COLORS, FONTS } from '../../../../themes';
import { cleanString, defaultString } from '../../../../utils/StringUtil';

const ModalChangePassword: FunctionComponent<ModalChangePasswordProps> = props => {
  const mounted = useRef(false);
  const { errors, handleChange, handleBlur, setFieldValue, values, touched, handleSubmit, resetForm } = useFormik({
    initialValues: {
      oldPassword: undefined,
      hideOldPassword: true,
      newPassword: undefined,
      hideNewPassword: true,
      newPasswordRetry: undefined,
      hideNewPasswordRetry: true,
    },
    onSubmit: (values, actions) => doRequest({ values, actions }),
    validationSchema: schemaValidation,
    enableReinitialize: true,
  })

  //componentDidUpdate
  useEffect(() => {
    if (mounted.current) {
      resetForm()
    }
    return () => { }
  }, [props.postData])

  //componentDidMount
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    return () => { mounted.current = false }
  }, [])

//Misc
  const doRequest = ({ values, actions }: { values: any; actions: any }) => {
    const request = {
      old_password: cleanString(values?.oldPassword),
      password: cleanString(values?.newPassword),
    }
    props.postNewPassword(request)
  }

  //Rendering 
  return (
    <Modal
      isVisible={props.isVisible}
      onVisibleChange={props.onVisibleChange}
    >
      <Text>Cambio de contraseña</Text>
      <Separator />
      <Input
        secureTextEntry={values.hideOldPassword}
        placeholder="Contraseña"
        iconName="lock-closed"
        value={values.oldPassword}
        onValueChange={handleChange("oldPassword")}
        onInputBlur={handleBlur("oldPassword")}
        showError={touched.oldPassword && errors.oldPassword}
        textContentType='password'
        rightSection={
          <Ionicons
            onPress={() => setFieldValue("hideOldPassword", !values.hideOldPassword)}
            name={values.hideOldPassword ? "eye" : "eye-off"}
            size={FONTS.mediumIcon}
            color={COLORS.primary}
          />
        }
      />
      <Input
        secureTextEntry={values.hideNewPassword}
        placeholder="Repetir contraseña"
        iconName="lock-closed"
        value={values.newPassword}
        onValueChange={handleChange("newPassword")}
        onInputBlur={handleBlur("newPassword")}
        showError={touched.newPassword && errors.newPassword}
        returnKeyType="done"
        textContentType='newPassword'
        rightSection={
          <Ionicons
            onPress={() => setFieldValue("hideNewPassword", !values.hideNewPassword)}
            name={values.hideNewPassword ? "eye" : "eye-off"}
            size={FONTS.mediumIcon}
            color={COLORS.primary}
          />
        }
      />
      <Input
        secureTextEntry={values.hideNewPasswordRetry}
        placeholder="Repetir contraseña"
        iconName="lock-closed"
        value={values.newPasswordRetry}
        onValueChange={handleChange("newPasswordRetry")}
        onInputBlur={handleBlur("newPasswordRetry")}
        showError={touched.newPasswordRetry && errors.newPasswordRetry}
        returnKeyType="done"
        textContentType='newPassword'
        rightSection={
          <Ionicons
            onPress={() => setFieldValue("hideNewPasswordRetry", !values.hideNewPasswordRetry)}
            name={values.hideNewPasswordRetry ? "eye" : "eye-off"}
            size={FONTS.mediumIcon}
            color={COLORS.primary}
          />
        }
      />
      <Button
        title='Cambiar contraseña'
        onPress={handleSubmit}
        bottomSeparate={false}
        isLoading={props.postLoading}
      />
    </Modal>
  )
};

interface ModalChangePasswordProps extends ReduxProps {
  isVisible: boolean;
  onVisibleChange: (val: boolean) => void;
}

ModalChangePassword.defaultProps = {

};

const schemaValidation = yup.object().shape({
  oldPassword: yup.string().required(defaultString.requiredText),
  newPassword: yup.string().required(defaultString.requiredText),
  newPasswordRetry: yup.string()
    .required(defaultString.requiredText)
    .oneOf([yup.ref('newPassword')], 'Las contraseñas no coinciden'),
})

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  postData: state.profileMain.newPasswordData,
  postLoading: state.profileMain.newPasswordLoading,
  postError: state.profileMain.newPasswordError,
});

const mapDispatchToProps = {
  postNewPassword: ProfileMainActions.postNewPassword,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(ModalChangePassword)