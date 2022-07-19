export interface DocumentListRequest {

}

export interface DocumentListItem {
  id: number;
  document_id: number;
  name: string;
  extension: 'pdf' | 'kmz' | 'png' | 'jpeg' | null | undefined;
  due_date: null;
  document_state: number;
  origin_doc: number;
  route: string;
  created_at: string;
  updated_at: string;
  url: string;
  pivot: {
    citizen_id: string;
    available_id: number
  }
}

export interface DocumentListResponse {
  current_page: number;
  data: DocumentListItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number
}