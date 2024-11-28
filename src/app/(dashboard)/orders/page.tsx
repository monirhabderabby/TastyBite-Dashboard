import SectionHeader from "@/components/common/section-header/section-header";
import { Separator } from "@/components/ui/separator";
import dynamic from "next/dynamic";

const OrdersTable = dynamic(() => import("./components/orders-table"));

const OrdersPage = () => {
    return (
        <div>
            <SectionHeader title="Orders" subTitle="Manage all orders" />
            <Separator className="mb-4" />
            <OrdersTable />
        </div>
    );
};

export default OrdersPage;
