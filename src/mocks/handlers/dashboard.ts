
import type { AppSchema } from '../../types/shared.types';
import { db } from '../db';

export const dashboardHandlers = {
  // GET /api/dashboard
  getDashboard(schema: AppSchema) {
    // You can either use schema or directly return from db
    return db.dashboard || {
      stats: {
        activeJobs: { value: 82, trend: 15, trendType: 'YoY' },
        onlineDrivers: { value: 25, total: 50, trend: 15, trendType: 'MoM' },
        totalJobs: { value: 2488, trend: 15, trendType: 'YoY' },
        totalRevenue: { value: 84200, trend: 15, trendType: 'YoY' }
      },
      userGrowth: {
        total: 1082,
        newJoiners: 500,
        growth: 15,
        trendType: 'YoY',
        monthlyData: []
      },
      recentActivity: [],
      quickActions: []
    };
  }
};