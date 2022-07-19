import { RenderFieldProps } from "../../components/form/components/RenderField";

export type DraftListRequest = number

export interface DraftListResponse {
  current_page: number;
  data: DraftListItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: null | number;
  path: string;
  per_page: number;
  prev_page_url: null | number;
  to: number;
  total: number;
}

export interface DraftListItem {
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
    formulary_id: null | number;
    expertform_id: number;
    flow_id: number;
    process_flow: null | number;
    rating: string;
    description: string;
    slug: string;
    criticidad: string;
    link_access: string;
    helper_link: string;
    document_exit: null | number;
    multiple_document: string;
    sirit_code: string;
    external_pay: number;
    config_service: null | number;
    status_alert: number;
    created_at: string;
    updated_at: string;
    visited: number;
    requested: number;
    is_always_available: number;
    expire_at: string;
    pricing: false,
    status_name: string;
    institution: {
      id: number;
      name: string;
      province: null | number;
      municip: null | number;
      sector: null | number;
    }
  }
}