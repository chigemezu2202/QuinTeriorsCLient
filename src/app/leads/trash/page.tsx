"use client";

import React from "react";
import { useTable } from "@refinedev/react-table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { dataProvider } from "@/providers/data-provider";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { ListView, ListViewHeader } from "@/components/refine-ui/views/list-view";

import { RestoreButton } from "@/components/refine-ui/buttons/restore";
import {
  LeadsColumnHeader,
  LeadsTableToolbar,
} from "../_components/leads-table-controls";

type Lead = {
  id: number;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  service_id?: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
};

export default function LeadsTrashPage() {
  const queryClient = useQueryClient();

  const restoreMutation = useMutation({
    mutationFn: async (id: number) => {
      return dataProvider.restoreLead(id);
    },
    onSuccess: async () => {
      //Refresh Table
      await table.refineCore.tableQuery.refetch();

      queryClient.invalidateQueries({
        queryKey: ["leads"],
      });
    }
  });

  const columns = React.useMemo(() => {
    const columnHelper =
      createColumnHelper<Lead>();

    return [
      columnHelper.accessor("name", {
        id: "name",
        header: ({ column }) => (
          <LeadsColumnHeader column={column} title="Name" />
        ),
        enableSorting: true,
      }),

      columnHelper.accessor("phone", {
        id: "phone",
        header: "Phone",
        enableSorting: false,
      }),

      columnHelper.accessor("email", {
        id: "email",
        header: "Email",
        enableSorting: false,
      }),

      columnHelper.accessor("status", {
        id: "status",
        header: ({ column }) => (
          <LeadsColumnHeader column={column} title="Status" />
        ),
        enableSorting: true,
      }),

      columnHelper.accessor("created_at", {
        id: "created_at",
        header: ({ column }) => (
          <LeadsColumnHeader column={column} title="Created At" />
        ),
        enableSorting: true,
        cell: ({ getValue }) =>
          getValue()
            ? new Date(
              getValue() as string
            ).toLocaleString()
            : "-",
      }),

      columnHelper.accessor("deleted_at", {
        id: "deleted_at",
        header: "Deleted At",
        enableSorting: false,
        cell: ({ getValue }) =>
          getValue()
            ? new Date(
              getValue() as string
            ).toLocaleString()
            : "-",
      }),

      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <RestoreButton
            onRestore={() =>
              restoreMutation.mutate(
                Number(row.original.id)
              )
            }
          />
        ),
      }),
    ];
  }, [restoreMutation]);

  const table = useTable({
    columns,
    refineCoreProps: {
      resource: "leads-trash",
      syncWithLocation: true,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        mode: "server",
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
    },
  });


  return (
    <ListView>
      <div className="flex justify-between items-center mb-4">
        <ListViewHeader />

        <h2 className="text-muted-foreground">
          Deleted Leads
        </h2>
      </div>

      <LeadsTableToolbar
        table={table}
        searchPlaceholder="Search deleted leads"
      />
      <DataTable table={table} />
    </ListView>
  );
}
