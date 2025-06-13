
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { LogEntry } from "@/types/logs";

interface DurationChartProps {
  data: LogEntry[];
}

const DurationChart = ({ data }: DurationChartProps) => {
  const chartData = data
    .map((log, index) => ({
      index: index + 1,
      timestamp: new Date(log.timestamp).toLocaleTimeString(),
      duration: log.duration,
      command: log.command,
      status: log.status,
      subcommand: log.subcommand
    }))
    .slice(-20); // Show last 20 commands for readability

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-card-foreground">{data.timestamp}</p>
          <p className="text-sm font-mono text-muted-foreground mb-1">
            {data.command}
          </p>
          <p className="text-sm text-card-foreground">
            <span className="font-medium">Duration:</span> {data.duration.toFixed(2)}s
          </p>
          <p className="text-sm text-card-foreground">
            <span className="font-medium">Subcommand:</span> {data.subcommand}
          </p>
        </div>
      );
    }
    return null;
  };

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <div className="text-2xl mb-2">📊</div>
          <p>No data to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="index"
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            axisLine={{ stroke: "hsl(var(--border))" }}
            tickLine={{ stroke: "hsl(var(--border))" }}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            axisLine={{ stroke: "hsl(var(--border))" }}
            tickLine={{ stroke: "hsl(var(--border))" }}
            label={{ 
              value: 'Duration (s)', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fill: "hsl(var(--muted-foreground))" }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="duration" 
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DurationChart;
