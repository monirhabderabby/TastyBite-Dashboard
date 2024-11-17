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
import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";
import { TBlog } from "@/types";
import { BlogColumns } from "./blog-columns";

const BlogTable: React.FC = () => {
    const { data, isLoading } = useGetAllBlogsQuery({});

    if (isLoading) {
        return <TableSkeleton />;
    }

    return (
        <div>
            <TableContainer data={data.data} columns={BlogColumns} />
        </div>
    );
};

export default BlogTable;

interface TableContainerProps {
    data: TBlog[];
    columns: ColumnDef<TBlog>[];
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

    const categoryOptions = useMemo(() => {
        const categoryMap = new Map();

        data?.forEach((blog) => {
            categoryMap.set(blog.blogCategory, {
                value: blog.blogCategory,
                label: blog.blogCategory,
            });
        });

        const uniqueCategories = new Set(categoryMap.values());

        return Array.from(uniqueCategories);
    }, [data]);

    return (
        <div>
            <div className="flex justify-between items-center py-4">
                <Input
                    placeholder="Filter by title"
                    value={
                        (table
                            .getColumn("title")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        table
                            .getColumn("title")
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-[300px] focus-visible:ring-[#3a6f54]"
                />

                <div className="flex items-center gap-x-2">
                    <DataTableFacetedFilter
                        title="Category"
                        column={table.getColumn("blogCategory")}
                        options={categoryOptions}
                    />
                    <DataTableViewOptions table={table} />
                </div>
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
