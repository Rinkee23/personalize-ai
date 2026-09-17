import { BarChart } from "../components/charts/BarChart.tsx"
import { Card, CardContent, CardHeader } from "../components/ui/Card.tsx"
import { useQueryMock } from "../hooks/useMockData.ts"
import type { DashboardStats } from "../services/mockData.ts"

export default function Dashboard() {
  const { data: stats, isLoading } = useQueryMock<DashboardStats>({
    queryKey: ["dashboard-stats"],
  })

  const topProducts = stats?.topProducts ?? []
  const recentActivity = stats?.recentActivity ?? []
  const growthData = stats?.userGrowth ?? []

  if (isLoading) {
    return <div className="py-12 text-center text-muted-foreground">Loading dashboard...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Card>
          <CardHeader>Total Users</CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{(stats?.totalUsers ?? 0).toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Active Users</CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-secondary">{(stats?.activeUsers ?? 0).toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Events Today</CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-info">{(stats?.eventsToday ?? 0).toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Conversions</CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-success">{(stats?.conversions ?? 0).toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Revenue</CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-warning">${(stats?.revenue ?? 0).toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Active Campaigns</CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-destructive">{(stats?.activeCampaigns ?? 0).toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>User Growth</CardHeader>
          <CardContent>
            <BarChart
              data={growthData.map((item) => ({ name: item.date, value: item.value }))}
              dataKey="value"
              xAxisKey="name"
              color="#3b82f6"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Top Products</CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topProducts.map((product) => (
                <div key={product.name} className="flex items-center justify-between rounded-lg bg-muted p-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                      {topProducts.indexOf(product) + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-success">${product.revenue.toLocaleString()}</span>
                </div>
              ))}
              {topProducts.length === 0 && (
                <p className="py-4 text-center text-sm text-muted-foreground">No product data</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>Recent Activity</CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                    {activity.user.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.user}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{new Date(activity.timestamp).toLocaleString()}</span>
              </div>
            ))}
            {recentActivity.length === 0 && (
              <p className="py-4 text-center text-sm text-muted-foreground">No recent activity</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
