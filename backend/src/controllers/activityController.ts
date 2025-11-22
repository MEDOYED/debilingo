import { Request, Response } from 'express';
import { supabase } from '../config/supabase.js';
import { DailyActivity, CreateActivityRequest } from '../types/activity.js';

// Temporary user ID - in production, this would come from authentication
const DEFAULT_USER_ID = '00000000-0000-0000-0000-000000000000';

/**
 * Get all activity data for the last year
 */
export const getActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const oneYearAgoStr = oneYearAgo.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('daily_activity')
      .select('*')
      .eq('user_id', DEFAULT_USER_ID)
      .gte('date', oneYearAgoStr)
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching activity:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch activity data',
        message: error.message,
      });
      return;
    }

    res.json(data || []);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

/**
 * Add or update activity for a specific date (defaults to today)
 * Note: word_count field stores dollar amounts
 */
export const addActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { word_count, date } = req.body as CreateActivityRequest;

    // Validation - word_count stores dollar amounts
    if (typeof word_count !== 'number' || word_count < 0 || word_count > 100000) {
      res.status(400).json({
        success: false,
        error: 'Invalid amount. Must be a number between 0 and 100,000.',
      });
      return;
    }

    const activityDate = date || new Date().toISOString().split('T')[0];

    // Check if activity already exists for this date
    const { data: existing, error: fetchError } = await supabase
      .from('daily_activity')
      .select('*')
      .eq('user_id', DEFAULT_USER_ID)
      .eq('date', activityDate)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 means no rows found, which is fine
      console.error('Error checking existing activity:', fetchError);
      res.status(500).json({
        success: false,
        error: 'Failed to check existing activity',
      });
      return;
    }

    let result;

    if (existing) {
      // Update existing activity by adding to the count
      const newCount = existing.word_count + word_count;
      const { data, error } = await supabase
        .from('daily_activity')
        .update({ word_count: newCount })
        .eq('id', existing.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating activity:', error);
        res.status(500).json({
          success: false,
          error: 'Failed to update activity',
        });
        return;
      }

      result = data;
    } else {
      // Insert new activity
      const { data, error } = await supabase
        .from('daily_activity')
        .insert({
          user_id: DEFAULT_USER_ID,
          date: activityDate,
          word_count: word_count,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating activity:', error);
        res.status(500).json({
          success: false,
          error: 'Failed to create activity',
        });
        return;
      }

      result = data;
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

/**
 * Get total statistics for the last year
 */
export const getStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const oneYearAgoStr = oneYearAgo.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('daily_activity')
      .select('word_count')
      .eq('user_id', DEFAULT_USER_ID)
      .gte('date', oneYearAgoStr);

    if (error) {
      console.error('Error fetching stats:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch statistics',
      });
      return;
    }

    const total = data?.reduce((sum, item) => sum + item.word_count, 0) || 0;

    res.json({ total });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};
