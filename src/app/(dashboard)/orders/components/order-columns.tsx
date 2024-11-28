import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { cn } from "@/lib/utils";
import { TOrder } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import userPlaceholderImg from "../../../../../public/user-placeholder.png";
import CancelOrder from "./cancel-order";
import UpdateDeliveryMan from "./update-delivery-man";
import UpdateStatus from "./update-status";

export const OrderColumns: ColumnDef<TOrder>[] = [
    {
        accessorKey: "transactionId",
        header: "Transaction ID",
        cell: ({ row }) => {
            const { transactionId } = row.original || {};
            return (
                <span className="font-medium text-gray-800">
                    {transactionId || "N/A"}
                </span>
            );
        },
    },
    {
        accessorKey: "invoiceId",
        header: "Invoice",
        cell: ({ row }) => {
            const { invoiceId } = row.original || {};
            return (
                <span className="font-medium text-gray-800">
                    {invoiceId || "N/A"}
                </span>
            );
        },
    },
    {
        accessorKey: "user",
        header: "User",
        cell: ({ row }) => {
            const { user } = row.original || {};
            return (
                <div className="flex items-center gap-x-3">
                    <div className="relative h-[30px] w-[30px] rounded-full">
                        <Image
                            src={user.image || userPlaceholderImg}
                            alt={user.name || ""}
                            width={30}
                            height={30}
                            className="rounded-full bg-gray-100"
                        />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "deliveryMan",
        header: "Delivery Man",
        cell: ({ row }) => {
            const { deliveryMan } = row.original || {};
            return deliveryMan ? (
                <div className="flex items-center gap-x-3">
                    <div className="relative h-[30px] w-[30px] rounded-full">
                        <Image
                            src={deliveryMan.image || userPlaceholderImg}
                            alt={deliveryMan.name || ""}
                            width={30}
                            height={30}
                            className="rounded-full bg-gray-100"
                        />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold">
                            {deliveryMan.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {deliveryMan.phone}
                        </p>
                    </div>
                </div>
            ) : (
                <span className="text-sm text-gray-400">Not Assigned</span>
            );
        },
    },
    {
        accessorKey: "orderStatus",
        header: "Status",
        cell: ({ row }) => {
            const { orderStatus } = row.original || {};
            return (
                <p
                    className={cn(
                        "text-sm font-medium px-3 py-1 rounded-[50px] w-28 text-center",
                        orderStatus === "Order Placed" && "bg-blue-200",
                        orderStatus === "Cooking" && "bg-yellow-200",
                        orderStatus === "Out For Delivery" && "bg-amber-200",
                        orderStatus === "Delivered" && "bg-green-200",
                        orderStatus === "Cancelled" && "bg-red-200",
                        orderStatus === "PickedUp" && "bg-purple-200",
                        orderStatus === "Order Confirmed" && "bg-cyan-200"
                    )}
                >
                    {orderStatus}
                </p>
            );
        },
    },
    {
        accessorKey: "totalPrice",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Total Price" />
        ),
        cell: ({ row }) => {
            const { totalPrice } = row.original || {};
            return (
                <span className="text-sm font-semibold text-gray-800">
                    ${totalPrice.toFixed(2)}
                </span>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Order Date" />
        ),
        cell: ({ row }) => {
            const { createdAt } = row.original || {};
            const date = new Date(createdAt);
            return (
                <span className="text-sm text-gray-600">
                    {date.toLocaleDateString()}
                </span>
            );
        },
    },
    {
        accessorKey: "deliveryLocation",
        header: "Delivery Location",
        cell: ({ row }) => {
            const { deliveryLocation } = row.original || {};
            return (
                <span className="text-sm text-gray-800">
                    {deliveryLocation}
                </span>
            );
        },
    },
    {
        accessorKey: "",
        header: "Update Status",
        cell: ({ row }) => {
            const order = row.original || {};

            return (
                <div className="w-fit">
                    <UpdateStatus order={order} />
                </div>
            );
        },
    },
    {
        accessorKey: "",
        header: "Assign Delivery Man",
        cell: ({ row }) => {
            const order = row.original || {};

            return (
                <div className="w-fit">
                    <UpdateDeliveryMan order={order} />
                </div>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const order = row.original;
            return <CancelOrder order={order} />;
        },
    },
];
