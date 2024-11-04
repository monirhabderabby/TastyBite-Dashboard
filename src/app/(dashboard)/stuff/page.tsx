import SectionHeader from "@/components/common/section-header/section-header";
import { Separator } from "@/components/ui/separator";
import StuffTable from "./components/stuff-table";

const StuffPage = () => {
    return (
        <div>
            <SectionHeader
                title="Stuff"
                subTitle="Manage all stuff"
                btnLink="/stuff/create"
            />
            <Separator className="mb-4" />
            <StuffTable />
        </div>
    );
};

export default StuffPage;
