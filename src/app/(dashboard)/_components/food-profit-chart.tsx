"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface FoodProfitChartProps {
    data: { month: string; profit: number }[];
}

export function FoodProfitChart({ data }: FoodProfitChartProps) {
    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Food-based Profit</CardTitle>
            </CardHeader>
            <CardContent className="pl-0">
                <ChartContainer
                    config={{
                        profit: {
                            label: "Profit",
                            color: "hsl(var(--chart-2))",
                        },
                    }}
                    className="h-[300px]"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Line
                                type="monotone"
                                dataKey="profit"
                                stroke="var(--color-profit)"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
