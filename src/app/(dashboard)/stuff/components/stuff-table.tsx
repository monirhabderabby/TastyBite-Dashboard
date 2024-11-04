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
import { useGetAllStuffsQuery } from "@/redux/features/stuff/stuffApi";
import { stuffProps } from "../[stuffId]/components/stuff-form";
import { StuffColumns } from "./stuff-columns";

const StuffTable: React.FC = () => {
    const { data, isLoading } = useGetAllStuffsQuery({});

    if (isLoading) {
        return <TableSkeleton />;
    }

    console.log(data);

    return (
        <div>
            <TableContainer data={data?.data} columns={StuffColumns} />
        </div>
    );
};

export default StuffTable;

interface TableContainerProps {
    data: stuffProps[];
    columns: ColumnDef<stuffProps>[];
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
            {data?.length > 10 && (
                <div className="mt-4">
                    <DataTablePagination table={table} />
                </div>
            )}
        </div>
    );
};
