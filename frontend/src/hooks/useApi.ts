import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import api from "../api/axios.ts"

export interface User {
  id: number
  name: string
  email: string
  role: string
  active: boolean
}

export interface Metric {
  date: string
  value: number
}

export interface DashboardStats {
  totalUsers: number
  activeUsers: number
  growthRate: number
  metrics: Metric[]
}

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await api.get<User[]>("/users")
      return response.data
    },
    staleTime: 5 * 60 * 1000,
  })
}

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const response = await api.get<DashboardStats>("/dashboard/stats")
      return response.data
    },
    staleTime: 5 * 60 * 1000,
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newUser: Partial<User>) => {
      const response = await api.post<User>("/users", newUser)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updatedUser: Partial<User> & { id: number }) => {
      const response = await api.put<User>(`/users/${updatedUser.id}`, updatedUser)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })
}

export function handleApiError(error: unknown): string {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message
  }
  return "An unexpected error occurred"
}
