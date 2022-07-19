import { IModalListInDto } from 'react-native-picker-modal-view/dist/Interfaces';
import * as yup from 'yup';
import { defaultString } from '../../../utils/StringUtil';
import { Item } from 'react-native-picker-select';

export interface SignupState {
  docType?: string;
  docNumber?: string;
  hidePassword: boolean;
  password?: string;
  hidePasswordRetry: boolean;
  passwordRetry?: string;
  email?: string;
  name?: string;
  firstLastName?: string;
  secondLastName?: string;
  province?: IModalListInDto;
  municipality?: IModalListInDto;
  sector?: IModalListInDto;
  address?: string;
  jobTitle?: string;
  cellPhone?: string;
  phone?: string;
}

export const schemaValidation = yup.object().shape({
  docType: yup.string().required(defaultString.requiredText),
  docNumber: yup.string().required(defaultString.requiredText)
    //document
    .when('docType', {
      is: (docType: IModalListInDto) => docType.Value == '1',
      then: yup.string().min(13, "La cédula debe tener 11 caracteres").required(defaultString.requiredText)
    })
    //Passport
    .when('docType', {
      is: (docType: IModalListInDto) => docType.Value == '2',
      then: yup.string().min(5, "El pasaporte debe tener al menos 5 caracteres").required(defaultString.requiredText)
    })
    //default
    .when('docType', {
      is: (docType: IModalListInDto) => !docType?.Value,
      then: yup.string().required(defaultString.requiredText)
    }),
  email: yup.string().email(defaultString.validEmail).required(defaultString.requiredText),
  name: yup.string().required(defaultString.requiredText),
  firstLastName: yup.string().required(defaultString.requiredText),
  jobTitle: yup.string().required(defaultString.requiredText),
  cellPhone: yup.string().required(defaultString.requiredText).min(14, defaultString.validPhone),
  phone: yup.string().required(defaultString.requiredText).min(14, defaultString.validPhone),
  // secondLastName: yup.string().required(defaultString.requiredText),
  province: yup.object().shape({
    Value: yup.mixed().required(defaultString.requiredText),
  }),
  municipality: yup.object().shape({
    Value: yup.mixed().required(defaultString.requiredText),
  }),
  sector: yup.object().shape({
    Value: yup.mixed().required(defaultString.requiredText),
  }),
  address: yup.string().required(defaultString.requiredText),
  password: yup.string()
    .min(4, defaultString.requiredText)
    .required(defaultString.requiredText),
  passwordRetry: yup.string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required(defaultString.requiredText),
})