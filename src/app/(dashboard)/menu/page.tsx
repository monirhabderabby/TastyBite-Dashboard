import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import MenuTable from "./components/menu-table";

const MenuPage = () => {
    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-primary-black text-[30px] font-bold">
                        Menu
                    </h2>
                    <p className="text-primary-gray text-sm mb-1">
                        Manage all menu
                    </p>
                </div>
                <Link href={"/menu/create"}>
                    <Button
                        className="text-sm bg-primary-black hover:bg-primary-orange text-white hover:text-primary-black rounded-md px-3 py-2 duration-300"
                        size="sm"
                    >
                        <Plus className="h-4 w-4" />
                        Add New
                    </Button>
                </Link>
            </div>
            <Separator className="mb-4" />
            <MenuTable />
        </div>
    );
};

export default MenuPage;
