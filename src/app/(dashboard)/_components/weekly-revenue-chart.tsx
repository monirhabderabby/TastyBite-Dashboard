"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface RecipeSalesChartProps {
  data: { _id: string; name: string; totalSell: number }[];
}

const data = [
  {
    name: "Jan",
    total: 400,
  },
  {
    name: "Feb",
    total: 300,
  },
  {
    name: "Mar",
    total: 500,
  },
  {
    name: "Apr",
    total: 350,
  },
  {
    name: "May",
    total: 600,
  },
  {
    name: "June",
    total: 450,
  },
  {
    name: "July",
    total: 550,
  },
  {
    name: "Aug",
    total: 550,
  },
  {
    name: "Sep",
    total: 550,
  },
  {
    name: "Oct",
    total: 550,
  },
];

const chartConfig = {
  total: {
    label: "Sell",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

function WeeklyRevenueChart({}: RecipeSalesChartProps) {
  return (
    <Card className=" shadow-none">
      <CardHeader>
        <CardTitle>Weekly Revenue</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <ChartContainer config={chartConfig}>
            <BarChart data={data}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="total" fill="#FD9D3E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default WeeklyRevenueChart;
