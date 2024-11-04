"use client";

import { useGetSingleMenuQuery } from "@/redux/features/menu/menuApi";
import { Loader } from "lucide-react";
import MenuForm from "./menu-form";

const Menu = ({ menuId }: { menuId: string }) => {
    const { data, isLoading } = useGetSingleMenuQuery(menuId);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <Loader className="w-10 h-10 animate-spin" />
            </div>
        );
    }
    console.log(data?.data);

    return (
        <div>
            <MenuForm menu={data?.data} />
        </div>
    );
};

export default Menu;
