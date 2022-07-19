export interface ClaimRequest {

}

export interface ClaimResponseItem {
  id: number;
  code_claim: string;
  service_id: number;
  request_id: number;
  citizen_id: string;
  citizen_name: string;
  solution: null | string;
  status: string;
  issue_id: number;
  description: string;
  created_at: string;
  updated_at: string;
}

export type ClaimResponse = ClaimResponseItem[]

export interface IssueRequest {

}

export interface IssueResponseItem {
  id: number;
  content: string;
  created_at: null | string;
  updated_at: null | string;
}

export type IssueResponse = IssueResponseItem[]

export interface PostClaimRequest {

}

export interface PostClaimResponse {
  message?: string;
  success?: boolean;
}