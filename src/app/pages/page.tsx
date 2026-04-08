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

type Pages = {
  id: string;
  title?: string | null;
  slug?: string | null;
  content?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  is_published?: boolean;
};

export default function PagesList() {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<Pages>();

    return [
      columnHelper.accessor('title', {
        id: 'title',
        header: 'Title',
        enableSorting: true,
      }),
      columnHelper.accessor('slug', {
        id: 'slug',
        header: 'Slug',
        enableSorting: true,
      }),
      columnHelper.accessor('content', {
        id: 'content',
        header: 'Content',
        enableSorting: true,
      }),
      columnHelper.accessor('meta_title', {
        id: 'meta_title',
        header: 'Meta title',
        enableSorting: true,
      }),
      columnHelper.accessor('meta_description', {
        id: 'meta_description',
        header: 'Meta description',
        enableSorting: true,
      }),
      columnHelper.accessor('is_published', {
        id: 'is_published',
        header: 'Published',
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
