"use client";

import React from "react";
import type {
  BaseRecord,
  CrudFilter,
  HttpError,
  LogicalFilter,
} from "@refinedev/core";
import type { UseTableReturnType } from "@refinedev/react-table";
import type { Column } from "@tanstack/react-table";
import { Search, X } from "lucide-react";

import { DataTableSorter } from "@/components/refine-ui/data-table/data-table-sorter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUS_OPTIONS = [
  { label: "New", value: "new" },
  { label: "Contacted", value: "contacted" },
  { label: "Closed", value: "closed" },
];

type LeadsTableToolbarProps<TData extends BaseRecord> = {
  table: UseTableReturnType<TData, HttpError>;
  searchPlaceholder?: string;
};

export function LeadsTableToolbar<TData extends BaseRecord>({
  table,
  searchPlaceholder = "Search leads",
}: LeadsTableToolbarProps<TData>) {
  const { filters, setFilters, setCurrentPage } = table.refineCore;
  const searchFilterValue = getFilterValue(filters, "search");
  const statusFilterValue = getFilterValue(filters, "status");
  const [search, setSearch] = React.useState(searchFilterValue);

  React.useEffect(() => {
    setSearch(searchFilterValue);
  }, [searchFilterValue]);

  const updateFilter = React.useCallback(
    (field: "search" | "status", value: string | undefined) => {
      setFilters(
        [
          {
            field,
            operator: field === "search" ? "contains" : "eq",
            value,
          },
        ],
        "merge"
      );
      setCurrentPage(1);
    },
    [setCurrentPage, setFilters]
  );

  React.useEffect(() => {
    const handler = window.setTimeout(() => {
      const value = search.trim();
      updateFilter("search", value.length > 0 ? value : undefined);
    }, 300);

    return () => window.clearTimeout(handler);
  }, [search, updateFilter]);

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = search.trim();
    updateFilter("search", value.length > 0 ? value : undefined);
  };

  const clearSearch = () => {
    setSearch("");
    updateFilter("search", undefined);
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <form
        className="flex w-full gap-2 sm:max-w-md"
        onSubmit={handleSearchSubmit}
      >
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
        <Button
          type="submit"
          size="icon"
          variant="outline"
          aria-label="Search leads"
          title="Search leads"
        >
          <Search className="size-4" />
        </Button>
        {searchFilterValue ? (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            aria-label="Clear search"
            title="Clear search"
            onClick={clearSearch}
          >
            <X className="size-4" />
          </Button>
        ) : null}
      </form>

      <Select
        value={statusFilterValue || "all"}
        onValueChange={(value) => {
          updateFilter("status", value === "all" ? undefined : value);
        }}
      >
        <SelectTrigger className="w-full sm:w-44" aria-label="Filter by status">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          {STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

type LeadsColumnHeaderProps<TData> = {
  column: Column<TData>;
  title: string;
};

export function LeadsColumnHeader<TData>({
  column,
  title,
}: LeadsColumnHeaderProps<TData>) {
  return (
    <div className="flex items-center gap-1">
      <span className="truncate">{title}</span>
      {column.getCanSort() ? <DataTableSorter column={column} /> : null}
    </div>
  );
}

function getFilterValue(filters: CrudFilter[] | undefined, field: string) {
  const filter = filters?.find((item): item is LogicalFilter => {
    return "field" in item && item.field === field;
  });
  const value = filter?.value;

  if (typeof value === "string") {
    return value;
  }

  return "";
}
