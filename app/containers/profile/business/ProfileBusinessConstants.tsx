import { defaultString } from "../../../utils/StringUtil";
import * as yup from 'yup';
export interface ProfileBusinessState {
  businessName?: string;
  businessAddress?: string;
  businessRnc?: string;
  businessPhone?: string;
  businessUrl?: string;
}

 export const schemaValidation = yup.object().shape({
  businessName: yup.string().required(defaultString.requiredText),
  businessAddress: yup.string().required(defaultString.requiredText),
  businessPhone: yup.string().required(defaultString.requiredText).min(10, defaultString.validPhone).max(14, defaultString.validPhone),
  businessUrl: yup.string().required(defaultString.requiredText).url(defaultString.validUrl),
})