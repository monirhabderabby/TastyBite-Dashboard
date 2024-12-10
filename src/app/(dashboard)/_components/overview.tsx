"use client";

// Packages
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
import dynamic from "next/dynamic";

// Local imports
import SkeletonWrapper from "@/components/common/skeleton-loader/skeleton-wrapper";
import ErrorState from "@/components/ui/error-state";
import { useGetAllStatsQuery } from "@/redux/features/stats/statsApi";
import FoodBasedProfit from "./food-based-profit";
import StatsCard from "./stats-card";
const WeeklyRevenueChart = dynamic(() => import("./weekly-revenue-chart"));

const OverviewPage = () => {
  const { data, isLoading, isError } = useGetAllStatsQuery({});

  let content;
  if (isLoading || data) {
    content = (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <StatsCard
            title="Total Sales"
            value={`$${data?.data?.totalSell[0]?.totalSell.toLocaleString()}`}
            icon={DollarSign}
            isLoading={isLoading}
          />
          <StatsCard
            title="Completed Orders"
            value={data?.data.totalCompletedOrders}
            icon={ShoppingBag}
            isLoading={isLoading}
          />
          <StatsCard
            title="Running Orders"
            value={data?.data.totalPendingOrders}
            icon={BaggageClaim}
            isLoading={isLoading}
          />
          <StatsCard
            title="Cancelled Orders"
            value={data?.data.totalCancelledOrders}
            icon={CalendarMinus}
            isLoading={isLoading}
          />
          <StatsCard
            title="Total Recipes"
            value={data?.data.totalRecipe}
            icon={ChefHat}
            isLoading={isLoading}
          />
          <StatsCard
            title="Total Staff"
            value={data?.data.totalStaff}
            icon={Users}
            isLoading={isLoading}
          />
          <StatsCard
            title="Delivery Man"
            value={data?.data.totalDeliveryMan}
            icon={Bike}
            isLoading={isLoading}
          />
          <StatsCard
            title="Users"
            value={data?.data.totalUsers}
            icon={UsersRound}
            isLoading={isLoading}
          />
        </div>
        <div className="grid gap-4 grid-cols-1  lg:grid-cols-2">
          <SkeletonWrapper fullWidth={false} isLoading={isLoading}>
            <WeeklyRevenueChart data={data?.data.recipeBasedSell} />
          </SkeletonWrapper>
          <SkeletonWrapper fullWidth isLoading={isLoading}>
            <FoodBasedProfit />
          </SkeletonWrapper>
        </div>
      </div>
    );
  } else if (isError || !data?.success) {
    const msg =
      data?.message ||
      "Something went wrong. Please try again or contact support if the issue persists.";
    content = <ErrorState message={msg} />;
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
