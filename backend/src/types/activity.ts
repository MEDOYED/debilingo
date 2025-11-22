export interface DailyActivity {
  id: string;
  date: string;
  word_count: number;
  user_id: string;
  created_at: string;
}

export interface CreateActivityRequest {
  word_count: number;
  date?: string;
}

export interface ActivityStats {
  total: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
