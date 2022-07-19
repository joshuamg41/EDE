import * as yup from 'yup';
import { defaultString } from "../../../utils/StringUtil";
import { Item } from "react-native-picker-select";

export interface ForgotPasswordState {
  docType?: string;
  docNumber?: string;
  email?: string;
}

export const schemaValidation = yup.object().shape({
  docType: yup.string().required(defaultString.requiredText),
  docNumber: yup.string().required(defaultString.requiredText)
    //document
    .when('docType', {
      is: (docType: string) => docType == '1',
      then: yup.string().min(13, "La cédula debe tener 11 caracteres").required(defaultString.requiredText)
    })
    //Passport
    .when('docType', {
      is: (docType: string) => docType == '2',
      then: yup.string().min(5, "El pasaporte debe tener al menos 5 caracteres").required(defaultString.requiredText)
    })
    //default
    .when('docType', {
      is: (docType: string) => !docType,
      then: yup.string().required(defaultString.requiredText)
    }),
  email: yup.string().email(defaultString.validEmail).required(defaultString.requiredText),
})