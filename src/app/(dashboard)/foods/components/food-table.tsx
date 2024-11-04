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
import TableSkeleton from "@/components/common/skeleton-loader/table-skeleton";
import { DataTable } from "@/components/ui/data-table";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
import { Input } from "@/components/ui/input";
import { useGetAllFoodsQuery } from "@/redux/features/food/foodApi";
import { FoodColumns } from "./food-columns";

// Define the type for a food menu item
interface FoodItem {
    _id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    menu: string;
}

const FoodTable: React.FC = () => {
    const { data, isLoading } = useGetAllFoodsQuery({});

    if (isLoading) {
        return <TableSkeleton />;
    }

    return (
        <div>
            <TableContainer data={data.data} columns={FoodColumns} />
        </div>
    );
};

export default FoodTable;

interface TableContainerProps {
    data: FoodItem[];
    columns: ColumnDef<FoodItem>[];
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
                    placeholder="Filter by name"
                    value={
                        (table.getColumn("name")?.getFilterValue() as string) ??
                        ""
                    }
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        table
                            .getColumn("name")
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
