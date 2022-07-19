export interface NotificationListRequest {
  id?: string;
  message?: string;
  data?: object[];
}

export interface NotificationListItem {
  notification_id: string;
  Type: string;
  date: [],
  event:string;
  route: string;
  title: string;
  Entity: string;
  Evento: string;
  content: string;
  "iD de ciudadano": string;
  "iD de solicitud": number;
}

export interface NotificationListResponse {
  notifications?: NotificationListItem[];
}