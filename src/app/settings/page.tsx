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

type Settings = {
  id: string;
  site_name?: string | null;
  tagline?: string | null;
  headline?: string | null;
  sub_headline?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  facebook_url?: string | null;
  tiktok_url?: string | null;
  business_hours_weekdays?: string | null;
  business_hours_saturday?: string | null;
};

export default function SettingsList() {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<Settings>();

    return [
      columnHelper.accessor('site_name', {
        id: 'site_name',
        header: 'Site name',
        enableSorting: true,
      }),
      columnHelper.accessor('tagline', {
        id: 'tagline',
        header: 'Tagline',
        enableSorting: true,
      }),
      columnHelper.accessor('headline', {
        id: 'headline',
        header: 'Headline',
        enableSorting: true,
      }),
      columnHelper.accessor('sub_headline', {
        id: 'sub_headline',
        header: 'Sub headline',
        enableSorting: true,
      }),
      columnHelper.accessor('phone', {
        id: 'phone',
        header: 'Phone',
        enableSorting: true,
      }),
      columnHelper.accessor('whatsapp', {
        id: 'whatsapp',
        header: 'WhatsApp',
        enableSorting: true,
      }),
      columnHelper.accessor('email', {
        id: 'email',
        header: 'Email',
        enableSorting: true,
      }),
      columnHelper.accessor('address', {
        id: 'address',
        header: 'Address',
        enableSorting: true,
      }),
      columnHelper.accessor('city', {
        id: 'city',
        header: 'City',
        enableSorting: true,
      }),
      columnHelper.accessor('state', {
        id: 'state',
        header: 'State',
        enableSorting: true,
      }),
      columnHelper.accessor('country', {
        id: 'country',
        header: 'Country',
        enableSorting: true,
      }),
      columnHelper.accessor('facebook_url', {
        id: 'facebook_url',
        header: 'Facebook URL',
        enableSorting: true,
      }),
      columnHelper.accessor('tiktok_url', {
        id: 'tiktok_url',
        header: 'TikTok URL',
        enableSorting: true,
      }),
      columnHelper.accessor('business_hours_weekdays', {
        id: 'business_hours_weekdays',
        header: 'Business hours (weekdays)',
        enableSorting: true,
      }),
      columnHelper.accessor('business_hours_saturday', {
        id: 'business_hours_saturday',
        header: 'Business hours (Saturday)',
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
      resource: "settings",
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
