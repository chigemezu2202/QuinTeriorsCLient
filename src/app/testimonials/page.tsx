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

type Testimonials = {
  id: string;
  name?: string | null;
  message?: string | null;
  rating?: number;
  is_featured?: boolean;
};

export default function TestimonialsList() {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<Testimonials>();

    return [
      columnHelper.accessor('name', {
        id: 'name',
        header: 'Name',
        enableSorting: true,
      }),
      columnHelper.accessor('message', {
        id: 'message',
        header: 'Message',
        enableSorting: true,
      }),
      columnHelper.accessor('rating', {
        id: 'rating',
        header: 'Rating',
        enableSorting: true,
      }),
      columnHelper.accessor('is_featured', {
        id: 'is_featured',
        header: 'Featured',
        enableSorting: true,
        cell: ({ getValue }) => (
          <Badge variant={getValue() ? 'default' : 'secondary'}>{getValue() ? 'Yes' : 'No'}</Badge>
        ),
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
      resource: "testimonials",
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
