"use client";

import { useGetSingleStuffQuery } from "@/redux/features/stuff/stuffApi";
import { Loader } from "lucide-react";
import StuffForm from "./stuff-form";

const Stuff = ({ stuffId }: { stuffId: string }) => {
    const { data, isLoading } = useGetSingleStuffQuery(stuffId, {
        skip: stuffId === "create",
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
            <StuffForm stuff={stuffId !== "create" ? data?.data : undefined} />
        </div>
    );
};

export default Stuff;
