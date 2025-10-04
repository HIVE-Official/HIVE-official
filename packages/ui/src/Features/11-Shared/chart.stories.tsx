import type { Meta, StoryObj } from "@storybook/react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "../../atomic/atoms/chart";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

const meta = {
  title: "11-Shared/Chart",
  component: ChartContainer,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ChartContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const barChartData = [
  { month: "Jan", revenue: 4000, expenses: 2400 },
  { month: "Feb", revenue: 3000, expenses: 1398 },
  { month: "Mar", revenue: 2000, expenses: 9800 },
  { month: "Apr", revenue: 2780, expenses: 3908 },
  { month: "May", revenue: 1890, expenses: 4800 },
  { month: "Jun", revenue: 2390, expenses: 3800 },
];

const barChartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--destructive))",
  },
};

export const BarChartExample: Story = {
  render: () => (
    <ChartContainer config={barChartConfig} className="min-h-[300px] w-[600px]">
      <BarChart data={barChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[8, 8, 0, 0]} />
        <Bar dataKey="expenses" fill="var(--color-expenses)" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ChartContainer>
  ),
};

const lineChartData = [
  { name: "Mon", visitors: 400, conversions: 240 },
  { name: "Tue", visitors: 300, conversions: 139 },
  { name: "Wed", visitors: 200, conversions: 980 },
  { name: "Thu", visitors: 278, conversions: 390 },
  { name: "Fri", visitors: 189, conversions: 480 },
  { name: "Sat", visitors: 239, conversions: 380 },
  { name: "Sun", visitors: 349, conversions: 430 },
];

const lineChartConfig = {
  visitors: {
    label: "Visitors",
    color: "hsl(var(--primary))",
  },
  conversions: {
    label: "Conversions",
    color: "hsl(var(--chart-2))",
  },
};

export const LineChartExample: Story = {
  render: () => (
    <ChartContainer config={lineChartConfig} className="min-h-[300px] w-[600px]">
      <LineChart data={lineChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          type="monotone"
          dataKey="visitors"
          stroke="var(--color-visitors)"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="conversions"
          stroke="var(--color-conversions)"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ChartContainer>
  ),
};
