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
import React, { useMemo } from "react";

// Components
import TableSkeleton from "@/components/common/skeleton-loader/table-skeleton";
import { DataTable } from "@/components/ui/data-table";
import { DataTableFacetedFilter } from "@/components/ui/data-table-faceted-filter";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
import { Input } from "@/components/ui/input";
import { useGetAllStuffsQuery } from "@/redux/features/stuff/stuffApi";
import { TStaff } from "@/types";
import { StuffColumns } from "./stuff-columns";

const StuffTable: React.FC = () => {
    const { data, isLoading } = useGetAllStuffsQuery({});

    if (isLoading) {
        return <TableSkeleton />;
    }

    return (
        <div>
            <TableContainer data={data?.data} columns={StuffColumns} />
        </div>
    );
};

export default StuffTable;

interface TableContainerProps {
    data: TStaff[];
    columns: ColumnDef<TStaff>[];
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

    const designationOptions = useMemo(() => {
        const designationMap = new Map();

        data?.forEach((stuff) => {
            designationMap.set(stuff.designation, {
                value: stuff.designation,
                label: stuff.designation,
            });
        });

        const uniqueDesignation = new Set(designationMap.values());

        return Array.from(uniqueDesignation);
    }, [data]);

    return (
        <div>
            <div className="flex justify-between items-center py-4">
                <div className="flex items-center gap-x-2">
                    <Input
                        placeholder="Filter by name"
                        value={
                            (table
                                .getColumn("name")
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) =>
                            table
                                .getColumn("name")
                                ?.setFilterValue(event.target.value)
                        }
                        className="max-w-[300px] focus-visible:ring-[#3a6f54]"
                    />
                    <DataTableFacetedFilter
                        title="Designation"
                        column={table.getColumn("designation")}
                        options={designationOptions}
                    />
                </div>

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
