import { RenderFieldProps } from "../../components/form/components/RenderField";

export interface ServiceListRequest {
  id?: string;
  message?: string;
  data?: object[];
}

export interface ServiceListResponse {
  id?: number;
  name?: string;
  description?: string;
  services?: ServiceListItem[];
}

export interface ServiceListItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  insti_id: number;
  type_id: number;
  area_id: number;
  created_at: string;
  status_name: string;
  app_movil: boolean;
  institution: {
    id: number;
    name: string;
    province: number;
    municip: number;
    sector: number;
  };
  type: {
    id: number;
    name: string;
    slug: string;
  };
  addresseds: {
    id: number;
    name: string;
    icon: string;
    pivot: {
      services_service_id: number;
      addresseds_addressed_id: number;
    }
  }[];
}

export type ServiceDetailRequest = number

export interface ServiceDetailResponse {
  id: number;
  process_id: string;
  code_serv: string;
  name: string;
  provider: string;
  send: number;
  send_expertcode: number;
  app_movil: number;
  status_id: number;
  area_id: number;
  insti_id: number;
  type_id: number;
  formulary_id: null;
  expertform_id: number;
  activity_id: string;
  flow_id: number;
  process_flow: null;
  rating: string;
  description: string;
  slug: string;
  criticidad: string;
  link_access: string;
  helper_link: string;
  document_exit: null;
  multiple_document: true;
  sirit_code?: string | null;
  external_pay?: number | null;
  config_service: null;
  status_alert: number;
  created_at: string;
  updated_at: string;
  visited: number;
  requested: number;
  is_always_available: number;
  status_name: string;
  compactSchedule: {
    Horario: string;
  }[];
  institution: {
    id: number;
    name: string;
    acronym: string;
    rnc: string;
    token: string;
    email: string;
    website: string;
    slug: string;
    province_id: number;
    municip_id: number;
    sector_id: number;
    hood_id: number;
    phone: string;
    address: string;
    picture: string;
    recaudationCode: number;
    status_insti: number;
    created_at: string;
    updated_at: string;
    compactSchedule: {
      Horario: string;
    }[];
    province: {
      id: number;
      nombre: string;
      created_at: string;
      updated_at: string;
    };
    municip: {
      id: number;
      nombre: string;
      provincia_id: number;
      created_at: string;
      updated_at: string;
    };
    sector: {
      id: number;
      nombre: string;
      municipio_id: number;
      created_at: string;
      updated_at: string;
    };
    schedules: {
      id: number;
      day: string;
      init: string;
      finit: string;
      created_at: string;
      updated_at: string;
      pivot: {
        institutions_id: number;
        schedules_id: number;
      }
    }[];
  };
  prices: {
    key: string;
    id: number;
    concept: string;
    description: string;
    service_id: number;
    status: string;
    created_at: string;
    updated_at: string;
    variations: {
      id: number;
      concept: string;
      description: string;
      method_payment: null;
      time: number;
      price: number;
      coin: string;
      quantity: number;
      required: number;
      created_at: string;
      updated_at: string;
      pivot: {
        prices_id: number;
        price_variations_id: number
      };
      delivery_time: {
        id: number;
        months: number;
        days: number;
        hours: number;
        created_at: string;
        updated_at: string
      }
    }[];
  }[];
  type: {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
  };
  area: {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
  };
  responsibles: {
    id: number;
    name: string;
    email: string;
    phone: string;
    insti_id: number;
    created_at: string;
    updated_at: string;
    pivot: {
      service_id: number;
      service_responsible_id: number
    }
  }[];
  addresseds: {
    id: number;
    name: string;
    icon: string;
    created_at: string;
    updated_at: string;
    pivot: {
      services_service_id: number;
      addresseds_addressed_id: number;
    }
  }[];
  requirements: {
    id: number;
    name: string;
    description: string;
    route: null;
    service_id: null;
    created_at: string;
    updated_at: string;
    pivot: {
      services_service_id: number;
      requirements_requirement_id: number;
    };
    service_commissioned: null
  }[];
  procedures: {
    id: number;
    step: string;
    type: string;
    created_at: string;
    updated_at: string;
    pivot: {
      services_service_id: number;
      procedures_procedure_id: number;
    }
  }[];
  relation_service: [];
  formulary: null;
  alerts_to_show: [];
  cardnet: null;
  requirement_commissioned: [];
  publics: {
    id: number;
    name: string;
    created_at: null;
    updated_at: null;
    pivot: {
      service_id: number;
      public_id: number;
    }
  }[];
  rating_list: [] | {
    id: number;
    request_id: number;
    citizen_id: string;
    rating:  number;
    comment: string;
    created_at: string;
    updated_at: string;
    citizen: {
      id: string;
      onesignal: string;
      mail: string;
      name: string;
      surname: string;
      secsurname: string;
      phone: string;
      city: string;
      created_at: string;
      updated_at: string;
    }
  }[];
  expertform: null;
  schedules: {
    id: number;
    day: string;
    init: string;
    finit: string;
    created_at: string;
    updated_at: string;
    pivot: {
      services_service_id: number;
      schedules_schedule_id: number;
    }[]
  },
  direction: {
    id: number;
    name: string;
    description: string;
  },
  has_draft: number;
}

export interface ServiceSolicitudeRequest {
  id?: string;
  message?: string;
  data?: object[];
}

export interface ServiceSolicitudeResponse {
  formulary_data: {
    name: string;
    institution_id: number;
    version: number;
  };
  fields: RenderFieldProps[][];
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
  };
}

export interface PostServiceSolicitudeRequest {
  id?: string;
  message?: string;
  data?: object[];
}

export interface PostServiceSolicitudeResponse {
  message?: string;
  idAutorizacionPortal?: string;
  success?: string;
  SoftExpertResponse?: {
    status?: string;
    details?: string;
    record_id?: string;
  };
  code?: string;
  RequestID?: string;
  title?: string;
  attributes?: string;
  acronym?: string;
  cardnet?: string;
  amount?: number;
}

export interface FileUploadRequest {

}

export interface FileUploadResponse {
  success: boolean;
  message: string;
  files: {
    name: string;
    extension: string;
    type: string;
    route: string;
  }[]
}

export interface MimarenaResponse {
  success: boolean;
  message: string;
}

export interface DppResponse {
  success: boolean;
  message: string;
}