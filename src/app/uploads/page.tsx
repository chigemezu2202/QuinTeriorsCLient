import { ListView, ListViewHeader } from "@/components/refine-ui/views/list-view";
"use client";

import { useTable } from "@refinedev/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";

import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import { EditButton } from "@/components/refine-ui/buttons/edit";
import { ShowButton } from "@/components/refine-ui/buttons/show";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { ListView } from "@/components/refine-ui/views/list-view";
import { Badge } from "@/components/ui/badge";

type Uploads = {
  id: string;
  file_name?: string | null;
  file_url?: string | null;
  file_type?: string | null;
  uploaded_by?: string | null;
};

export default function UploadsList() {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<Uploads>();

    return [
      columnHelper.accessor('file_name', {
        id: 'file_name',
        header: 'File name',
        enableSorting: true,
      }),
      columnHelper.accessor('file_url', {
        id: 'file_url',
        header: 'File URL',
        enableSorting: true,
      }),
      columnHelper.accessor('file_type', {
        id: 'file_type',
        header: 'File type',
        enableSorting: true,
      }),
      columnHelper.accessor('uploaded_by', {
        id: 'uploaded_by',
        header: 'Uploaded by',
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
    resource: "uploads",
    columns,
    refineCoreProps: {
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
