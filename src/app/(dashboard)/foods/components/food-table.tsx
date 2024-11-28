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
import { useGetAllFoodsQuery } from "@/redux/features/food/foodApi";
import { TFood } from "@/types";
import { FoodColumns } from "./food-columns";

const FoodTable: React.FC = () => {
    const { data, isLoading } = useGetAllFoodsQuery({});

    if (isLoading) {
        return <TableSkeleton />;
    }

    return (
        <div>
            <TableContainer data={data?.data} columns={FoodColumns} />
        </div>
    );
};

export default FoodTable;

interface TableContainerProps {
    data: TFood[];
    columns: ColumnDef<TFood>[];
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

    const menuOptions = useMemo(() => {
        const menusMap = new Map();

        data?.forEach((food) => {
            menusMap.set(food.menuId.name, {
                value: food.menuId._id,
                label: food.menuId.name,
            });
        });

        const uniqueMenus = new Set(menusMap.values());

        return Array.from(uniqueMenus);
    }, [data]);

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

                <div className="flex items-center gap-x-2">
                    <DataTableFacetedFilter
                        title="Food Menu"
                        column={table.getColumn("menuId")}
                        options={menuOptions}
                    />
                    <DataTableViewOptions table={table} />
                </div>
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
