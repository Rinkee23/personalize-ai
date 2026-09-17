import { useQuery, type UseQueryOptions, type UseQueryResult } from "@tanstack/react-query"
import { USE_MOCK_DATA, mockCustomers, mockEvents, mockProducts, mockSegments, mockCampaigns, mockExperiments, mockDashboardStats, mockAnalyticsData } from "../services/mockData.ts"

export function useQueryMock<T>(options: UseQueryOptions<T>): UseQueryResult<T> {
  const shouldUseMock = USE_MOCK_DATA
  const queryKey = options.queryKey?.[0] as string | undefined
  let mockData: T
  switch (queryKey) {
    case "customers":
      mockData = mockCustomers as T
      break
    case "events":
      mockData = mockEvents as T
      break
    case "products":
      mockData = mockProducts as T
      break
    case "segments":
      mockData = mockSegments as T
      break
    case "campaigns":
      mockData = mockCampaigns as T
      break
    case "experiments":
      mockData = mockExperiments as T
      break
    case "dashboard-stats":
      mockData = mockDashboardStats as T
      break
    case "analytics":
      mockData = mockAnalyticsData as T
      break
    default:
      mockData = null as T
  }
  return useQuery<T>({
    ...options,
    queryFn: shouldUseMock
      ? async () => {
          await new Promise((resolve) => setTimeout(resolve, 400))
          return mockData
        }
      : options.queryFn as ((_queryKey: unknown) => Promise<T>) | undefined,
  })
}
