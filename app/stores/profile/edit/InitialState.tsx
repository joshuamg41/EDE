import { IModalListInDto } from "react-native-picker-modal-view/dist/Interfaces";
import { ErrorObject } from "../../StoreConstants";

export interface ProfileInitialState {
  provinceData?: IModalListInDto[];
  provinceLoading: boolean;
  provinceError: ErrorObject;

  municipalityData?: IModalListInDto[];
  municipalityLoading: boolean;
  municipalityError: ErrorObject;

  sectorData?: IModalListInDto[];
  sectorLoading: boolean;
  sectorError: ErrorObject;

  updateCitizenData: any;
  updateCitizenLoading: boolean;
  updateCitizenError: ErrorObject;

  deleteData: {
    success?: boolean;
    message?: string;
  };
  deleteLoading: boolean;
  deleteError: ErrorObject;
}

export default {
  provinceData: [],
  provinceLoading: false,
  provinceError: null,

  municipalityData: [],
  municipalityLoading: false,
  municipalityError: null,

  sectorData: [],
  sectorLoading: false,
  sectorError: null,

  updateCitizenData: {},
  updateCitizenLoading: false,
  updateCitizenError: null,

  deleteData: {},
  deleteLoading: false,
  deleteError: null,
} as ProfileInitialState;
