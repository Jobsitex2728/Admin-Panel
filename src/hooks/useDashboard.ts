import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../services/mockApi';
import type { DashboardData } from '../types/dashboard.types';

export const useDashboard = () => {
  const {
    data,
    isLoading,
    error,
    refetch,
    isFetching,
    status
  } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await apiClient.get<DashboardData>('/dashboard');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return {
    dashboardData: data,
    isLoading,
    isFetching,
    error,
    refetch,
    status
  };
};