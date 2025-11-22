import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface DayActivity {
  id: string;
  date: string;
  word_count: number;
  user_id: string;
  created_at: string;
}

export interface ActivityStats {
  total: number;
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data);
      throw new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request);
      throw new Error('Network error. Please check your connection.');
    } else {
      // Something else happened
      console.error('Error:', error.message);
      throw new Error('An unexpected error occurred');
    }
  }
);

/**
 * Fetch all activity data for the user
 */
export const getActivity = async (): Promise<DayActivity[]> => {
  try {
    const response = await apiClient.get<DayActivity[]>('/activity');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch activity:', error);
    throw error;
  }
};

/**
 * Add or update activity for today
 */
export const addActivity = async (wordCount: number): Promise<DayActivity> => {
  try {
    const response = await apiClient.post<DayActivity>('/activity', {
      word_count: wordCount,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to add activity:', error);
    throw error;
  }
};

/**
 * Get total statistics
 */
export const getStats = async (): Promise<ActivityStats> => {
  try {
    const response = await apiClient.get<ActivityStats>('/stats');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    throw error;
  }
};
