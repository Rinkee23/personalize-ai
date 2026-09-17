import {
  Line,
  LineChart as RechartsLineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type DataKey,
} from "recharts"

export interface ChartData {
  name: string
  [key: string]: string | number
}

export interface LineChartProps<T extends ChartData> {
  data: T[]
  dataKey: DataKey<T> | string
  title?: string
  xAxisKey?: string
  color?: string
  className?: string
}

export function LineChart<T extends ChartData>({
  data,
  dataKey,
  title,
  xAxisKey = "name",
  color = "#3b82f6",
  className,
}: LineChartProps<T>) {
  return (
    <div className={className}>
      {title && <h3 className="mb-4 text-lg font-semibold">{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <RechartsLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
            }}
          />
          <Line type="monotone" dataKey={dataKey as DataKey<T>} stroke={color} strokeWidth={2} dot={false} />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}
