/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DashboardData } from "../types/dashboard.types";


const mockDashboardData: DashboardData = {
  stats: {
    activeJobs: {
      value: 82,
      trend: 15,
      trendType: 'YoY'
    },
    onlineDrivers: {
      value: 25,
      total: 50,
      trend: 15,
      trendType: 'MoM'
    },
    totalJobs: {
      value: 2488,
      trend: 15,
      trendType: 'YoY'
    },
    totalRevenue: {
      value: 84200,
      trend: 15,
      trendType: 'YoY'
    }
  },
  
  userGrowth: {
    total: 1082,
    newJoiners: 500,
    growth: 15,
    trendType: 'YoY',
    monthlyData: [
      { month: 'Feb', users: 400 },
      { month: 'Mar', users: 450 },
      { month: 'Apr', users: 500 },
      { month: 'May', users: 550 },
      { month: 'Jun', users: 600 },
      { month: 'Jul', users: 650 },
      { month: 'Aug', users: 700 },
      { month: 'Sep', users: 800 },
      { month: 'Oct', users: 900 },
      { month: 'Nov', users: 1000 },
      { month: 'Dec', users: 1082 }
    ]
  },
  
  recentActivity: [
    {
      id: 1,
      type: 'delivered',
      load: '#8219',
      description: 'Delivered',
      time: '2m ago',
      driver: 'Mike Ross',
      location: 'Chicago, IL',
      icon: 'check-circle'
    },
    {
      id: 2,
      type: 'delay',
      description: 'Driver Delayed',
      time: '12m ago',
      icon: 'alert-circle'
    },
    {
      id: 3,
      type: 'traffic',
      load: '#8300',
      description: 'Traffic on I-95',
      time: '15m ago',
      icon: 'alert-triangle'
    },
    {
      id: 4,
      type: 'payment',
      description: 'Payment Processed',
      time: '15m ago',
      invoice: 'INV-2023',
      icon: 'dollar-sign'
    },
    {
      id: 5,
      type: 'delivered',
      load: '#8219',
      description: 'Delivered',
      time: '9m ago',
      driver: 'Mike Ross',
      location: 'Chicago, IL',
      icon: 'check-circle'
    }
  ],
  
  quickActions: [
    { id: 1, label: 'New Load', icon: 'package' },
    { id: 2, label: 'New Load', icon: 'package' }
  ],
  
  timeFilters: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
  userFilters: ['New', 'Old'],
  
  lastMonthSummary: {
    label: 'Last Month Summary',
    value: 9488,
    trend: 15,
    trendType: 'YoY'
  }
};

const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export interface ApiResponse<T> {
  data: T;
  status?: number;
  message?: string;
}

export const mockApi = {
  getDashboardData: async (): Promise<ApiResponse<DashboardData>> => {
    await delay(800);
    return { data: mockDashboardData };
  },
  
  getJobs: async (): Promise<ApiResponse<any>> => {
    await delay(500);
    return { data: { jobs: [] } };
  },
  
  getDrivers: async (): Promise<ApiResponse<any>> => {
    await delay(500);
    return { data: { drivers: [] } };
  }
};

export interface ApiClient {
  get: <T>(url: string) => Promise<ApiResponse<T>>;
  post: <T>(url: string, data?: any) => Promise<ApiResponse<T>>;
  put: <T>(url: string, data?: any) => Promise<ApiResponse<T>>;
  delete: <T>(url: string) => Promise<ApiResponse<T>>;
}

export const apiClient: ApiClient = {
  get: async <T>(url: string): Promise<ApiResponse<T>> => {
    if (url === '/dashboard') {
      return mockApi.getDashboardData() as Promise<ApiResponse<T>>;
    }
    return { data: {} as T };
  },
  
  post: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    return { data: { success: true } as T };
  },
  
  put: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    return { data: { success: true } as T };
  },
  
  delete: async <T>(url: string): Promise<ApiResponse<T>> => {
    return { data: { success: true } as T };
  }
};