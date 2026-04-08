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

type Portfolio = {
  id: string;
  title?: string | null;
  category?: string | null;
  before_image?: string | null;
  after_image?: string | null;
  description?: string | null;
  is_featured?: boolean;
};

export default function PortfolioList() {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<Portfolio>();

    return [
      columnHelper.accessor('title', {
        id: 'title',
        header: 'Title',
        enableSorting: true,
      }),
      columnHelper.accessor('category', {
        id: 'category',
        header: 'Category',
        enableSorting: true,
      }),
      columnHelper.accessor('before_image', {
        id: 'before_image',
        header: 'Before image URL',
        enableSorting: true,
      }),
      columnHelper.accessor('after_image', {
        id: 'after_image',
        header: 'After image URL',
        enableSorting: true,
      }),
      columnHelper.accessor('description', {
        id: 'description',
        header: 'Description',
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
      syncWithLocation: true,
    },
  });

  return (
    <ListView>
      <DataTable table={table} />
    </ListView>
  );
}
