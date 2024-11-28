import SectionHeader from "@/components/common/section-header/section-header";
import { Separator } from "@/components/ui/separator";
import dynamic from "next/dynamic";

const FoodTable = dynamic(() => import("./components/food-table"));

const FoodPage = () => {
    return (
        <div>
            <SectionHeader
                title="Food"
                subTitle="Manage all food"
                btnLink="/foods/create"
            />
            <Separator className="mb-4" />
            <FoodTable />
        </div>
    );
};

export default FoodPage;
