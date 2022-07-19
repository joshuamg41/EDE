export interface RatingListRequest {

}

export interface RatingListItem {
  id: number;
  request_id: number;
  citizen_id: string;
  rating: number;
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
}

export interface RatingListResponse {
  current_page: number;
  data: [] | RatingListItem[];
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

export interface PostRatingRequest {
  request_id: number;
  rating: number;
  comment: string;
}

export interface PostRatingResponse {
  success: boolean;
}