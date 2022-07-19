import { useFormik } from 'formik';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import * as yup from 'yup';
import Button from '../../../../components/button/Button';
import InputMasked from '../../../../components/Input-masked/InputMasked';
import Input from '../../../../components/Input/Input';
import Modal from '../../../../components/modal/Modal';
import Separator from '../../../../components/separator/Separator';
import Text from '../../../../components/text/Text';
import { RootState } from '../../../../stores/AppReducers';
import ProfileMainActions from "../../../../stores/profile/main/Actions";
import { cleanNumber } from '../../../../utils/NumberUtil';
import { cleanString, defaultString, localToString } from '../../../../utils/StringUtil';

const ModalAddCompany: FunctionComponent<ModalAddCompanyProps> = props => {
  const mounted = useRef(false);
  const [state, setState] = useState<ModalAddState>({
    companyName: undefined,
    companyAddress: undefined,
    companyRnc: undefined,
    companyPhone: undefined,
    companyUrl: undefined,
    applicantName: undefined,
  })
  const { errors, handleChange, handleBlur, setFieldValue, values, touched, handleSubmit, resetForm } = useFormik({
    initialValues: state,
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

  //misc
  const doRequest = ({ values, actions }: { values: ModalAddState; actions: any }) => {
    const request = {
      citizen_id: localToString(props.user.data?.citizen_id),
      company_name: cleanString(values.companyName),
      company_address: cleanString(values.companyAddress),
      company_rnc: cleanNumber(values.companyRnc),
      company_phone: cleanNumber(values.companyPhone),
      company_url_web: cleanString(values.companyUrl),
      logo: "9090",
      applicant_name: localToString(`${props.user.data?.name} ${props.user.data?.first_last_name}`),
      active: "1",
    }
    props.postNewCompany(request)
  }

  //render
  return (
    <Modal
      isVisible={props.isVisible}
      onVisibleChange={props.onVisibleChange}
    >
      <Text>Agregar compañía</Text>
      <Separator />
      <Input
        placeholder="Nombre de la compañía"
        value={values.companyName}
        onValueChange={handleChange('companyName')}
        onInputBlur={handleBlur("companyName")}
        showError={touched.companyName && errors.companyName}
      />
      <Input
        placeholder="Dirección de la compañía"
        value={values.companyAddress}
        onValueChange={handleChange('companyAddress')}
        onInputBlur={handleBlur("companyAddress")}
        showError={touched.companyAddress && errors.companyAddress}
      />
      <InputMasked
        placeholder="Rnc de la compañía"
        value={values.companyRnc}
        onValueChange={handleChange('companyRnc')}
        onInputBlur={handleBlur("companyRnc")}
        showError={touched.companyRnc && errors.companyRnc}
        mask='rnc'
      />
      <InputMasked
        placeholder="Teléfono de la compañía"
        value={values.companyPhone}
        onValueChange={handleChange('companyPhone')}
        onInputBlur={handleBlur("companyPhone")}
        showError={touched.companyPhone && errors.companyPhone}
        mask='phone'
      />
      <Input
        placeholder="Url del WebSite"
        value={values.companyUrl}
        onValueChange={handleChange('companyUrl')}
        onInputBlur={handleBlur("companyUrl")}
        showError={touched.companyUrl && errors.companyUrl}
        keyboardType='url'
      />
      <Button
        title='Agregar compañía'
        onPress={handleSubmit}
        bottomSeparate={false}
        isLoading={props.postLoading}
      />
    </Modal>
  )
};

interface ModalAddCompanyProps extends ReduxProps {
  isVisible: boolean;
  onVisibleChange: (val: boolean) => void;
}

interface ModalAddState {
  companyName?: string;
  companyAddress?: string;
  companyRnc?: string;
  companyPhone?: string;
  companyUrl?: string;
  applicantName?: string;
}

ModalAddCompany.defaultProps = {

};

const schemaValidation = yup.object().shape({
  companyName: yup.string().required(defaultString.requiredText),
  companyAddress: yup.string().required(defaultString.requiredText),
  companyRnc: yup.string().required(defaultString.requiredText).min(12, defaultString.validRnc),
  companyPhone: yup.string().required(defaultString.requiredText).min(14, defaultString.validPhone),
  companyUrl: yup.string().required(defaultString.requiredText).url(defaultString.validUrl),
})

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  postData: state.profileMain.newCompanyData,
  postLoading: state.profileMain.newCompanyLoading,
  postError: state.profileMain.newCompanyError,
});

const mapDispatchToProps = {
  postNewCompany: ProfileMainActions.postNewCompany,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(ModalAddCompany)