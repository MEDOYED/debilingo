export interface CreateTagRequest {
  name: string;
  color: string;
}

export interface UpdateTagRequest {
  name?: string;
  color?: string;
}

export interface TrackerTag {
  id: string;
  user_id: string;
  name: string;
  color: string;
  created_at: string;
}
