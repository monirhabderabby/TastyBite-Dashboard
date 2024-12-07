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
import { useGetAllOrdersQuery } from "@/redux/features/order/orderApi";
import { TOrder } from "@/types";
import { OrderColumns } from "./order-columns";

const OrdersTable: React.FC = () => {
  const { data: orders, isLoading } = useGetAllOrdersQuery({});

  if (isLoading) {
    return <TableSkeleton rows={15} columns={8} />;
  }

  return (
    <div>
      <TableContainer data={orders?.data} columns={OrderColumns} />
    </div>
  );
};

export default OrdersTable;

interface TableContainerProps {
  data: TOrder[];
  columns: ColumnDef<TOrder>[];
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

  const orderStatusOptions = useMemo(() => {
    const orderStatusMap = new Map();

    data?.forEach((order) => {
      orderStatusMap.set(order.orderStatus, {
        value: order.orderStatus,
        label: order.orderStatus,
      });
    });

    const uniqueStatus = new Set(orderStatusMap.values());

    return Array.from(uniqueStatus);
  }, [data]);

  return (
    <div>
      <div className="flex justify-between items-center py-4">
        <Input
          placeholder="Filter by transaction id"
          value={
            (table.getColumn("transactionId")?.getFilterValue() as string) ?? ""
          }
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            table.getColumn("transactionId")?.setFilterValue(event.target.value)
          }
          className="max-w-[300px] focus-visible:ring-[#3a6f54]"
        />

        <div className="flex items-center gap-x-2">
          <DataTableFacetedFilter
            title="Order Status"
            column={table.getColumn("orderStatus")}
            options={orderStatusOptions}
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
