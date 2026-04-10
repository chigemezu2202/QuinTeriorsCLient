"use client";

import { useTable } from "@refinedev/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";

import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import { EditButton } from "@/components/refine-ui/buttons/edit";
import { ListView, ListViewHeader } from "@/components/refine-ui/views/list-view";
import { ShowButton } from "@/components/refine-ui/buttons/show";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { Badge } from "@/components/ui/badge";

type Admins = {
  id: string;
  email?: string | null;
  password?: string | null;
  role?: string | number;
};

export default function AdminsList() {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<Admins>();

    return [
      columnHelper.accessor('email', {
        id: 'email',
        header: 'Email',
        enableSorting: true,
      }),
      columnHelper.accessor('password', {
        id: 'password',
        header: 'Password',
        enableSorting: true,
      }),
      columnHelper.accessor('role', {
        id: 'role',
        header: 'Role',
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
      resource: "admins",
      syncWithLocation: true,
    },
  });

  return (
    <ListView>
      <ListViewHeader />
      <DataTable table={table} />
    </ListView>
  );
}
