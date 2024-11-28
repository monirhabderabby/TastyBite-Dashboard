"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { foodProfitData } from "@/lib/mock-data";
import { useGetAllStatsQuery } from "@/redux/features/stats/statsApi";
import {
    BaggageClaim,
    Bike,
    CalendarMinus,
    ChefHat,
    DollarSign,
    ShoppingBag,
    Users,
    UsersRound,
} from "lucide-react";
import { FoodProfitChart } from "./food-profit-chart";
import { RecipeSalesChart } from "./recipe-sales-chart";
import { StatsCard } from "./stats-card";

const OverviewPage = () => {
    const { data, isLoading, isError } = useGetAllStatsQuery({});

    let content;
    if (isLoading) {
        content = (
            <div className="space-y-6 p-6">
                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Card key={i} className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-4 rounded-full" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-8 w-28" />
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Charts */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Recipe-based Sales Chart */}
                    <Card className="p-6 space-y-4">
                        <Skeleton className="h-4 w-32" />
                        <div className="space-y-2">
                            <Skeleton className="h-[300px] w-full rounded-lg" />
                        </div>
                    </Card>

                    {/* Food-based Profit Chart */}
                    <Card className="p-6 space-y-4">
                        <Skeleton className="h-4 w-32" />
                        <div className="space-y-2">
                            <Skeleton className="h-[300px] w-full rounded-lg" />
                        </div>
                    </Card>
                </div>
            </div>
        );
    } else if (isError) {
        content = <p>Error loading data. Please try again later.</p>;
    } else {
        content = (
            <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    <StatsCard
                        title="Total Sales"
                        value={`$${data?.data?.totalSell[0]?.totalSell.toLocaleString()}`}
                        icon={DollarSign}
                    />
                    <StatsCard
                        title="Completed Orders"
                        value={data.data.totalCompletedOrders}
                        icon={ShoppingBag}
                    />
                    <StatsCard
                        title="Running Orders"
                        value={data.data.totalPendingOrders}
                        icon={BaggageClaim}
                    />
                    <StatsCard
                        title="Cancelled Orders"
                        value={data.data.totalCancelledOrders}
                        icon={CalendarMinus}
                    />
                    <StatsCard
                        title="Total Recipes"
                        value={data.data.totalRecipe}
                        icon={ChefHat}
                    />
                    <StatsCard
                        title="Total Staff"
                        value={data.data.totalStaff}
                        icon={Users}
                    />
                    <StatsCard
                        title="Delivery Man"
                        value={data.data.totalDeliveryMan}
                        icon={Bike}
                    />
                    <StatsCard
                        title="Users"
                        value={data.data.totalUsers}
                        icon={UsersRound}
                    />
                </div>
                <div className="grid gap-4 grid-cols-1 xl:grid-cols-8">
                    <RecipeSalesChart data={data.data.recipeBasedSell} />
                    <FoodProfitChart data={foodProfitData} />
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-wide">Overview</h2>
            </div>
            {content}
        </div>
    );
};

export default OverviewPage;
