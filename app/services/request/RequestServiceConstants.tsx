export interface RequestListRequest {
  id?: string;
  message?: string;
  data?: object[];
}

export interface RequestListResponse {
  current_page: number;
  data: [] | RequestListItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: null | string;
  path: string;
  per_page: number;
  prev_page_url: null | string;
  to: number;
  total: number;
}

export interface RequestListItem {
  id: number;
  code: string;
  service_id: number;
  formdata: string;
  doc_identification: string;
  idAutorizacionPortal: string;
  approval_number: null | string;
  sended: number;
  progress: number;
  status_id: number;
  provisional: number;
  payment_id: number;
  solution: null | string;
  date_creation: null | string;
  record_id: null | string;
  request_actions_id: number;
  isNew: number;
  created_at: string;
  updated_at: string;
  status: {
    id: number;
    name: string;
    color: string;
    activity_id: null | string;
    base_status_id: number;
    created_at: null | string;
    updated_at: string;
  };
  payment: {
    id: number;
    variations_selected: number[];
    payment_amount: string
  };
  rating: {
    id: number;
    request_id: number;
    citizen_id: string;
    rating: number;
    comment: string;
    created_at: string;
    updated_at: string;
  }[];
  service: {
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
    direction_id: number;
    type_id: number;
    formulary_id: null | string;
    expertform_id: number;
    flow_id: number;
    process_flow: null | string;
    rating: string;
    description: string;
    slug: string;
    criticidad: string;
    link_access: string;
    helper_link: string;
    document_exit: null | string;
    multiple_document: string;
    sirit_code: string;
    external_pay: number;
    config_service: null | string;
    status_alert: number;
    created_at: string;
    updated_at: string;
    visited: number;
    requested: number;
    is_always_available: number;
    status_name: string;
    institution: {
      id: number;
      name: string;
      picture: string;
      province: null | string;
      municip: null | string;
      sector: null | string
    }
  };
  request_actions: {
    id: number;
    name: string;
    class: string;
    type_id: number;
    created_at: null | string;
    updated_at: null | string;
  }
}

export interface RequestDetailResponse {
  requestPayload: any;
  request: {
    id: number;
    code: string;
    service_id: number;
    formdata: string;
    doc_identification: string;
    idAutorizacionPortal: string;
    approval_number: null;
    sended: number;
    progress: number;
    status_id: number;
    provisional: number;
    payment_id: number;
    solution: null;
    date_creation: null;
    record_id: null;
    request_actions_id: number;
    isNew: number;
    created_at: string;
    updated_at: string;
    comments: [];
    rating: {
      id: number;
      request_id: number;
      citizen_id: string;
      rating: number;
      comment: string;
      created_at: string;
      updated_at: string;
    }[];
    request_actions: {
      id: number;
      name: string;
      class: string;
      type_id: number;
      created_at: null;
      updated_at: null
    };
    messages: {
      id: number;
      request_id: number;
      message: string;
      created_at: string;
      updated_at: string;
    }[];
    activity?: {
      activity_id: string;
      created_at: string;
      id: number;
      request_id: number;
      updated_at: string;
    };
    status: {
      id: number;
      name: string;
      color: string;
      activity_id: null;
      base_status_id: number;
      created_at: null;
      updated_at: null
    };
    payment: {
      id: number;
      payment_amount: string;
      cant: number;
      variations_selected: number[];
      payment_status: string;
      payment_method: string;
      succesfullyPayment_date: null;
      created_at: string;
      updated_at: string;
    };
    service: {
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
      direction_id: number;
      type_id: number;
      formulary_id: null;
      expertform_id: number;
      flow_id: number;
      process_flow: null;
      rating: number;
      description: string;
      slug: string;
      criticidad: string;
      link_access: string;
      helper_link: string;
      document_exit: null;
      multiple_document: true;
      sirit_code: number;
      external_pay: number;
      config_service: null;
      status_alert: number;
      created_at: string;
      updated_at: string;
      visited: number;
      requested: number;
      is_always_available: number;
      status_name: string;
      institution: {
        id: number;
        name: string;
        acronym: string;
        picture: string;
        recaudationCode: number;
        province: null;
        municip: null;
        sector: null
      };
      cardnet: null
    };
    request_document: []
  };
  data: {
    label: string;
    value: string[];
    labelValue: null;
    type: string;
  }[];
  provitional: [];
  priceRequest: {
    id: number;
    concept: string;
    description: null | string;
    payment_method: null | string;
    approval_number: null | string;
    price: string;
    coin: string;
    request_id: number;
    created_at: string;
    updated_at: string;
  }[];
  direction: {
    id: number;
    name: string;
    description: string;
  },
}

export interface RequestResolveRequest {
  requestId?: number;
  entityAttributeId?: string;
  entityAttributeValue?: any;
}

export interface RequestResolveResponse {
  success?: boolean
}

export interface UserStatisticRequest {
  citizen_id?: string;
}

export interface UserStatisticResponse {
  reqsOpen?: number;
  reqsComplete?: number;
  documents?: number;
  reqsRejected?: number;
}