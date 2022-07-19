import { IModalListInDto } from "react-native-picker-modal-view/dist/Interfaces";
import * as yup from 'yup';
import { defaultString } from "../../../utils/StringUtil";

export interface ProfileEditState {
  cellPhone?: string;
  phone?: string;
  province?: IModalListInDto;
  municipality?: IModalListInDto;
  sector?: IModalListInDto;
  address?: string;
}

export const schemaValidation = yup.object().shape({
  cellPhone: yup.string().required(defaultString.requiredText).min(14, defaultString.validPhone),
  phone: yup.string().required(defaultString.requiredText).min(14, defaultString.validPhone),
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
})