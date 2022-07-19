import { RenderFieldProps } from "../../../components/form/components/RenderField";
import { DppResponse, MimarenaResponse, PostServiceSolicitudeResponse } from "../../../services/service/ServiceServiceConstants";
import { ErrorObject } from "../../StoreConstants";

export interface ServiceSolicitudeInitialState {
  getData: {
    formulary_data?: {
      name: string;
      institution_id: number;
      version: number;
    }
    data: RenderFieldProps[][];
    plainData: RenderFieldProps[];
    saved_fields?: {
      citizen_id: string;
      service_id: number;
      expertform_id: number;
      data: {
        key: string;
        value: string;
        labelValue: string;
        type: string;
        label: string;
      }[],
      grid: any[],
      appliedRuleList: string[],
      fakeStep: number;
      step: number;
      variations: string[];
      totalPayment: number;
    };
  };
  getLoading: boolean;
  getError: ErrorObject;

  postData: PostServiceSolicitudeResponse;
  postLoading: boolean;
  postError: ErrorObject;

  saveData: {
    appliedRuleList: string[];
    data: {
      key: string;
      type: string;
      label: string;
      value: string;
      labelValue: string;
    }[];
    grid: {
      [key: string]: any;
    };
    fakeStep: number;
    step: number;
    totalPayment: number;
    variations: string[];
  };
  saveLoading: boolean;
  saveError: ErrorObject;

  mimarenaData: MimarenaResponse & {
    payload: any;
  };
  mimarenaLoading: false | {
    invoiceNumber?: string;
    fieldKey?: string;
  };
  mimarenaError: ErrorObject;

  dppData: DppResponse & {
    payload: any;
  };
  dppLoading: false | {
    code?: string;
    type?: string;
    fieldKey?: string;
  };
  dppError: ErrorObject;
}

export default {
  getData: {
    data: [],
    plainData: [],
  },
  getLoading: false,
  getError: null,

  postData: {},
  postLoading: false,
  postError: null,

  saveData: {
    appliedRuleList: [],
    data: [],
    grid: {},
    fakeStep: 0,
    step: 0,
    totalPayment: 0,
    variations: [],
  },
  saveLoading: false,
  saveError: null,

  mimarenaData: {
    success: false,
    message: '',
    payload: {},
  },
  mimarenaLoading: false,
  mimarenaError: null,

  dppData: {
    success: false,
    message: '',
    payload: {},
  },
  dppLoading: false,
  dppError: null,
} as ServiceSolicitudeInitialState;