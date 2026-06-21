"use client";

import { useTable } from "@refinedev/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import { EditButton } from "@/components/refine-ui/buttons/edit";
import { ShowButton } from "@/components/refine-ui/buttons/show";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { ListView, ListViewHeader } from "@/components/refine-ui/views/list-view";
import {
  LeadsColumnHeader,
  LeadsTableToolbar,
} from "./_components/leads-table-controls";

type Leads = {
  id: string;
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  message?: string | null;
  service_id?: string | number;
  status?: string | number;
  created_at?: string | null;
  updated_at?: string | null;
};

export default function LeadsList() {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<Leads>();

    return [
      columnHelper.accessor('name', {
        id: 'name',
        header: ({ column }) => (
          <LeadsColumnHeader column={column} title="Name" />
        ),
        enableSorting: true,
      }),
      columnHelper.accessor('phone', {
        id: 'phone',
        header: 'Phone',
        enableSorting: false,
      }),
      columnHelper.accessor('email', {
        id: 'email',
        header: 'Email',
        enableSorting: false,
      }),
      columnHelper.accessor('message', {
        id: 'message',
        header: 'Message',
        enableSorting: false,
      }),
      columnHelper.accessor('service_id', {
        id: 'service_id',
        header: 'Service',
        enableSorting: false,
      }),
      columnHelper.accessor('status', {
        id: 'status',
        header: ({ column }) => (
          <LeadsColumnHeader column={column} title="Status" />
        ),
        enableSorting: true,
      }),
      columnHelper.accessor('created_at', {
        id: 'created_at',
        header: ({ column }) => (
          <LeadsColumnHeader column={column} title="Created At" />
        ),
        enableSorting: true,
        cell: ({ getValue }) =>
          getValue()
            ? new Date(getValue() as string).toLocaleString()
            : "-",
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
      filters: {
        mode: "server",
      },
      sorters: {
        initial: [
          {
            field: "created_at",
            order: "desc",
          },
        ],
        mode: "server",
      },
    }
  });

  return (
    <ListView>
      <div className="flex justify-between items-center mb-4">
        <ListViewHeader />

        <Link href="/leads/trash">
          <Button variant="outline">
            Trash
          </Button>
        </Link>
      </div>
      <LeadsTableToolbar table={table} />
      <DataTable table={table} />
    </ListView>
  );
}
