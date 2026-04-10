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

type Gallery = {
  id: string;
  title?: string | null;
  image_url?: string | null;
  category?: string | null;
};

export default function GalleryList() {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<Gallery>();

    return [
      columnHelper.accessor('title', {
        id: 'title',
        header: 'Title',
        enableSorting: true,
      }),
      columnHelper.accessor('image_url', {
        id: 'image_url',
        header: 'Image URL',
        enableSorting: true,
      }),
      columnHelper.accessor('category', {
        id: 'category',
        header: 'Category',
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
    resource: "gallery",
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
