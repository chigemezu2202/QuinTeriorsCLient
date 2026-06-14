"use client";

import { useTable } from "@refinedev/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";

import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import { EditButton } from "@/components/refine-ui/buttons/edit";
import { ShowButton } from "@/components/refine-ui/buttons/show";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { ListView, ListViewHeader } from "@/components/refine-ui/views/list-view";
import { Badge } from "@/components/ui/badge";

type Leads = {
  id: string;
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  message?: string | null;
  service_id?: string | number;
  status?: string | number;
};

export default function LeadsList() {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<Leads>();

    return [
      columnHelper.accessor('name', {
        id: 'name',
        header: 'Name',
        enableSorting: true,
      }),
      columnHelper.accessor('phone', {
        id: 'phone',
        header: 'Phone',
        enableSorting: true,
      }),
      columnHelper.accessor('email', {
        id: 'email',
        header: 'Email',
        enableSorting: true,
      }),
      columnHelper.accessor('message', {
        id: 'message',
        header: 'Message',
        enableSorting: true,
      }),
      columnHelper.accessor('service_id', {
        id: 'service_id',
        header: 'Service',
        enableSorting: true,
      }),
      columnHelper.accessor('status', {
        id: 'status',
        header: 'Status',
        enableSorting: true,
      }),

      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <EditButton recordItemId={row.original.id} size="sm" />
            <ShowButton recordItemId={row.original.id} size="sm" />
            <DeleteButton recordItemId={row.original.id} size="sm" />
          </div>
        ),
        enableSorting: false,
        size: 290,
      }),
    ];
  }, []);

  const table = useTable({
    columns,
    refineCoreProps: {
      resource: "leads",
      syncWithLocation: true,
      pagination: {
        currentPage: 1, // Use 'current' (or 'currentPage' depending on version)
        pageSize: 10,
        mode: "server", // Ensures pagination logic is active
      },
    }
  });

  return (
    <ListView>
      <ListViewHeader />
      <DataTable table={table} />
    </ListView>
  );
}
