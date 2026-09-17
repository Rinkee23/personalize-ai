import {
  Bar,
  BarChart as RechartsBarChart,
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

export interface BarChartProps<T extends ChartData> {
  data: T[]
  dataKey: DataKey<T> | string
  title?: string
  xAxisKey?: string
  color?: string
  className?: string
}

export function BarChart<T extends ChartData>({
  data,
  dataKey,
  title,
  xAxisKey = "name",
  color = "#3b82f6",
  className,
}: BarChartProps<T>) {
  return (
    <div className={className}>
      {title && <h3 className="mb-4 text-lg font-semibold">{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <RechartsBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #334159",
            }}
          />
          <Bar dataKey={dataKey as DataKey<T>} fill={color} radius={[4, 4, 0, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}
