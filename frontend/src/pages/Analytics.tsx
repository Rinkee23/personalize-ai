import { BarChart } from "../components/charts/BarChart.tsx"
import { PieChart } from "../components/charts/PieChart.tsx"
import { LineChart } from "../components/charts/LineChart.tsx"
import { Card, CardContent, CardHeader } from "../components/ui/Card.tsx"
import { useQueryMock } from "../hooks/useMockData.ts"
import type { AnalyticsData } from "../services/mockData.ts"

export default function Analytics() {
  const { data: analytics, isLoading } = useQueryMock<AnalyticsData>({
    queryKey: ["analytics"],
  })

  const funnel = analytics?.conversionFunnel ?? []
  const revenue = analytics?.revenueOverTime ?? []
  const campaigns = analytics?.campaignPerformance ?? []
  const recommendations = analytics?.recommendationPerformance ?? []
  const topEngagement = analytics?.topProductsByEngagement ?? []

  const funnelChartData = funnel.map((item) => ({ name: item.stage, value: item.count }))
  const campaignChartData = campaigns.map((item) => ({ name: item.name, impressions: item.impressions, conversions: item.conversions }))
  const recommendationChartData = recommendations.map((item) => ({ name: item.algorithm, clicks: item.clicks, conversions: item.conversions }))
  const engagementChartData = topEngagement.map((item) => ({ name: item.name, engagement: item.engagement }))
  const revenueChartData = revenue.map((item) => ({ name: item.date, revenue: item.revenue }))

  if (isLoading) {
    return <div className="py-12 text-center text-muted-foreground">Loading analytics...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>Conversion Funnel</CardHeader>
          <CardContent>
            <PieChart data={funnelChartData} title="" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Revenue Over Time</CardHeader>
          <CardContent>
            <LineChart data={revenueChartData} dataKey="revenue" xAxisKey="name" color="#22c55e" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>Campaign Performance</CardHeader>
          <CardContent>
            <BarChart data={campaignChartData} dataKey="conversions" xAxisKey="name" color="#8b5cf6" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Recommendation Performance</CardHeader>
          <CardContent>
            <BarChart data={recommendationChartData} dataKey="conversions" xAxisKey="name" color="#f59e0b" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>Top Products by Engagement</CardHeader>
        <CardContent>
          <BarChart data={engagementChartData} dataKey="engagement" xAxisKey="name" color="#3b82f6" />
        </CardContent>
      </Card>
    </div>
  )
}
