"use client";

import { useGetSingleFoodQuery } from "@/redux/features/food/foodApi";
import { Loader } from "lucide-react";
import FoodForm from "./food-form";

const Food = ({ foodId }: { foodId: string }) => {
    const { data, isLoading } = useGetSingleFoodQuery(foodId, {
        skip: foodId === "create",
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <Loader className="w-9 h-9 animate-spin opacity-50" />
            </div>
        );
    }
    return (
        <div>
            <FoodForm food={foodId !== "create" ? data?.data : undefined} />
        </div>
    );
};

export default Food;
