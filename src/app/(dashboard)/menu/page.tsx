import SectionHeader from "@/components/common/section-header/section-header";
import { Separator } from "@/components/ui/separator";
import MenuTable from "./components/menu-table";

const MenuPage = () => {
    return (
        <div>
            <SectionHeader
                title="Menu"
                subTitle="Manage all menu"
                btnLink="/menu/create"
            />
            <Separator className="mb-4" />
            <MenuTable />
        </div>
    );
};

export default MenuPage;
