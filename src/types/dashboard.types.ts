export interface StatItem {
  value: number;
  trend: number;
  trendType: 'YoY' | 'MoM' | 'YoV';
  total?: number;
}

export interface DashboardStats {
  activeJobs: StatItem;
  onlineDrivers: StatItem & { total: number };
  totalJobs: StatItem;
  totalRevenue: StatItem;
}

export interface MonthlyUserData {
  month: string;
  users: number;
}

export interface UserGrowthData {
  total: number;
  newJoiners: number;
  growth: number;
  trendType: string;
  monthlyData: MonthlyUserData[];
}

export type ActivityType = 'delivered' | 'delay' | 'traffic' | 'payment';
export type ActivityIcon = 'check-circle' | 'alert-circle' | 'alert-triangle' | 'dollar-sign';

export interface RecentActivity {
  id: number;
  type: ActivityType;
  load?: string;
  description: string;
  time: string;
  driver?: string;
  location?: string;
  invoice?: string;
  icon: ActivityIcon;
  extraInfo?: string;
}

export interface QuickAction {
  id: number;
  label: string;
  icon: string;
}

export interface DashboardData {
  stats: DashboardStats;
  userGrowth: UserGrowthData;
  recentActivity: RecentActivity[];
  quickActions: QuickAction[];
  timeFilters: string[];
  userFilters: string[];
  lastMonthSummary: {
    label: string;
    value: number;
    trend: number;
    trendType: string;
  };
}

export type TimeFilter = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';
export type UserFilter = 'New' | 'Old';

export interface DashboardState {
  timeFilter: TimeFilter;
  userFilter: UserFilter;
  sidebarCollapsed: boolean;
}