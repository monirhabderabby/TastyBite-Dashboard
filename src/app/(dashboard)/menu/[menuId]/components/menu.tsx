"use client";

import { useGetSingleMenuQuery } from "@/redux/features/menu/menuApi";
import { Loader } from "lucide-react";
import MenuForm from "./menu-form";

const Menu = ({ menuId }: { menuId: string }) => {
    const { data, isLoading } = useGetSingleMenuQuery(menuId, {
        skip: menuId === "create",
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
            <MenuForm menu={menuId !== "create" ? data?.data : undefined} />
        </div>
    );
};

export default Menu;
