
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/button";
import { PieChart as PieIcon, BarChart3 } from "lucide-react";
import { LogEntry } from "@/types/logs";

interface SubcommandChartProps {
  data: LogEntry[];
}

const SubcommandChart = ({ data }: SubcommandChartProps) => {
  const [chartType, setChartType] = useState<"pie" | "bar">("pie");

  // Process data for subcommand usage
  const subcommandCounts = data.reduce((acc, log) => {
    acc[log.subcommand] = (acc[log.subcommand] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(subcommandCounts).map(([subcommand, count]) => ({
    subcommand,
    count,
    percentage: ((count / data.length) * 100).toFixed(1)
  }));

  // Color palette using CSS variables
  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))", 
    "hsl(var(--accent))",
    "hsl(var(--muted))",
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#8dd1e1",
    "#d084d0"
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{data.subcommand}</p>
          <p className="text-sm">Count: {data.count}</p>
          <p className="text-sm">Percentage: {data.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <div className="text-2xl mb-2">📈</div>
          <p>No data to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Chart Type Selector */}
      <div className="flex items-center space-x-2">
        <Button
          variant={chartType === "pie" ? "default" : "outline"}
          size="sm"
          onClick={() => setChartType("pie")}
          className="flex items-center space-x-1"
        >
          <PieIcon className="h-4 w-4" />
          <span>Pie</span>
        </Button>
        <Button
          variant={chartType === "bar" ? "default" : "outline"}
          size="sm"
          onClick={() => setChartType("bar")}
          className="flex items-center space-x-1"
        >
          <BarChart3 className="h-4 w-4" />
          <span>Bar</span>
        </Button>
      </div>

      {/* Chart */}
      <div className="h-64">
        {chartType === "pie" ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ subcommand, percentage }) => `${subcommand} (${percentage}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="subcommand" 
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                label={{ value: 'Count', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="count" 
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Legend for Pie Chart */}
      {chartType === "pie" && (
        <div className="grid grid-cols-2 gap-2 text-sm">
          {chartData.map((entry, index) => (
            <div key={entry.subcommand} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="font-mono">{entry.subcommand}</span>
              <span className="text-muted-foreground">({entry.count})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubcommandChart;
