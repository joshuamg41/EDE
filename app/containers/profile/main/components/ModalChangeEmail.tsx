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

const ModalChangeEmail: FunctionComponent<ModalChangeEmailProps> = props => {
  const mounted = useRef(false);
  const { errors, handleChange, handleBlur, setFieldValue, values, touched, handleSubmit, resetForm } = useFormik({
    initialValues: {
      email: undefined,
      oldPassword: undefined,
      hideOldPassword: true,
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
      email: cleanString(values?.email),
      password: cleanString(values?.oldPassword),
    }
    props.postNewEmail(request)
  }

  //render
  return (
    <Modal
      isVisible={props.isVisible}
      onVisibleChange={props.onVisibleChange}
    >
      <Text>Cambio de Email</Text>
      <Separator />
      <Input
        iconName="mail-outline"
        placeholder="Correo"
        value={values.email}
        onValueChange={handleChange('email')}
        onInputBlur={handleBlur("email")}
        showError={touched.email && errors.email}
        maxLength={320}
        keyboardType="email-address"
        textContentType='emailAddress'
      />
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
      <Button
        title='Cambiar Email'
        onPress={handleSubmit}
        bottomSeparate={false}
        isLoading={props.postLoading}
      />
    </Modal>
  )
};

interface ModalChangeEmailProps extends ReduxProps {
  isVisible: boolean;
  onVisibleChange: (val: boolean) => void;
}

ModalChangeEmail.defaultProps = {

};

const schemaValidation = yup.object().shape({
  email: yup.string().email(defaultString.validEmail).required(defaultString.requiredText),
  oldPassword: yup.string().required(defaultString.requiredText),
})

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  postData: state.profileMain.newEmailData,
  postLoading: state.profileMain.newEmailLoading,
  postError: state.profileMain.newEmailError,
});

const mapDispatchToProps = {
  postNewEmail: ProfileMainActions.postNewEmail,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(ModalChangeEmail)