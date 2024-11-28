"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface RecipeSalesChartProps {
    data: { _id: string; name: string; totalSell: number }[];
}

export function RecipeSalesChart({ data }: RecipeSalesChartProps) {
    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Recipe-based Sales</CardTitle>
            </CardHeader>
            <CardContent className="pl-0">
                <ChartContainer
                    config={{
                        sales: {
                            label: "Sales",
                            color: "hsl(var(--chart-1))",
                        },
                    }}
                    className="h-[300px]"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Bar
                                dataKey="totalSell"
                                fill="var(--color-sales)"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
