"use client";

// Packages
import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import React from "react";

// Components
import { DataTable } from "@/components/ui/data-table";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
import { Input } from "@/components/ui/input";
import { dummyOrders, TDummyOrder } from "@/data/dummy-orders";
import { OrderColumns } from "./order-columns";

const OrdersTable: React.FC = () => {
    // if (isLoading) {
    //     return <TableSkeleton />;
    // }

    return (
        <div>
            <TableContainer data={dummyOrders} columns={OrderColumns} />
        </div>
    );
};

export default OrdersTable;

interface TableContainerProps {
    data: TDummyOrder[];
    columns: ColumnDef<TDummyOrder>[];
}

const TableContainer: React.FC<TableContainerProps> = ({ data, columns }) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div>
            <div className="flex justify-between items-center py-4">
                <Input
                    placeholder="Filter by invoice"
                    value={
                        (table
                            .getColumn("transactionId")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        table
                            .getColumn("transactionId")
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-[300px] focus-visible:ring-[#3a6f54]"
                />

                <DataTableViewOptions table={table} />
            </div>
            <DataTable columns={columns} table={table} />
            {data.length > 10 && (
                <div className="mt-4">
                    <DataTablePagination table={table} />
                </div>
            )}
        </div>
    );
};
