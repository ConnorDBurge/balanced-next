"use client";

import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type Row,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export type { ColumnDef } from "@tanstack/react-table";

interface DataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  onRowClick?: (row: TData) => void;
  enableRowSelection?: boolean;
  stickyHeader?: boolean;
  emptyState?: React.ReactNode;
  loading?: boolean;
  className?: string;
  groupByValue?: (row: TData) => string;
  groupSort?: (a: string, b: string) => number;
  groupRowLabel?: (groupKey: string, rows: TData[]) => { label: string; count: number; balance?: string };
}

type GroupSection<TData> = {
  key: string;
  rows: Row<TData>[];
};

export function DataTable<TData>({
  columns,
  data,
  onRowClick,
  stickyHeader = false,
  emptyState,
  loading = false,
  className,
  groupByValue,
  groupSort,
  groupRowLabel,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const rows = table.getRowModel().rows;
  const visibleCols = table.getVisibleFlatColumns();
  const isGrouped = !!groupByValue;

  const groupSections = useMemo<GroupSection<TData>[]>(() => {
    if (!groupByValue) return [];

    const map = new Map<string, Row<TData>[]>();

    for (const row of rows) {
      const key = groupByValue(row.original);
      const arr = map.get(key) ?? [];
      arr.push(row);
      map.set(key, arr);
    }

    const sections = Array.from(map.entries()).map(([key, groupRows]) => ({
      key,
      rows: groupRows,
    }));

    if (groupSort) {
      sections.sort((a, b) => groupSort(a.key, b.key));
    }

    return sections;
  }, [groupByValue, groupSort, rows]);

  const toggleGroup = (groupKey: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupKey)) {
        next.delete(groupKey);
      } else {
        next.add(groupKey);
      }
      return next;
    });
  };

  return (
    <div className={cn("overflow-clip rounded-lg border border-border", className)}>
      <Table className="table-fixed">
        <TableHeader className={cn(stickyHeader && "sticky top-0 z-10")}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-muted">
              {headerGroup.headers.map((header, idx) => {
                const isFirst = idx === 0;
                const canSort = header.column.getCanSort();
                const sorted = header.column.getIsSorted();

                return (
                  <TableHead
                    key={header.id}
                    onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                    className={cn(
                      isFirst && "pl-4",
                      !canSort && "cursor-default hover:text-muted-foreground",
                      header.column.columnDef.meta?.headerClassName
                    )}
                    style={
                      header.column.columnDef.meta?.width
                        ? {
                          width: header.column.columnDef.meta.width,
                          minWidth: header.column.columnDef.meta.width,
                          maxWidth: header.column.columnDef.meta.width,
                        }
                        : undefined
                    }
                  >
                    {header.isPlaceholder ? null : (
                      <span className="inline-flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {sorted === "asc" && <ArrowUp className="size-3" />}
                        {sorted === "desc" && <ArrowDown className="size-3" />}
                      </span>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        {loading ? (
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i} className="hover:bg-transparent">
                {visibleCols.map((col, idx) => (
                  <TableCell key={col.id} className={cn("py-3 px-4", idx === 0 && "pl-4")}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        ) : isGrouped ? (
          groupSections.map((section, sectionIdx) => {
            const isCollapsed = collapsedGroups.has(section.key);
            const isLastSection = sectionIdx === groupSections.length - 1;
            const isFirstSection = sectionIdx === 0;
            const info = groupRowLabel
              ? groupRowLabel(section.key, section.rows.map((row) => row.original))
              : { label: section.key, count: section.rows.length };

            return (
              <TableBody key={section.key}>
                <TableRow
                  className={cn(
                    "bg-muted cursor-pointer hover:bg-muted/80 sticky top-[37px] z-[9]",
                    !isFirstSection && "[&>td]:border-t [&>td]:border-border",
                    !isLastSection && "[&>td]:!border-b",
                  )}
                  onClick={() => toggleGroup(section.key)}
                >
                  {visibleCols.map((col, idx) => {
                    if (idx === 0) {
                      return (
                        <TableCell key={col.id} className="py-2.5 pl-4 pr-4">
                          <div className="flex items-center gap-2">
                            <ChevronDown
                              className={cn(
                                "size-4 text-muted-foreground transition-transform duration-200",
                                isCollapsed && "-rotate-90"
                              )}
                            />
                            <span className="font-semibold">{info.label}</span>
                            <span className="text-xs text-muted-foreground">({info.count})</span>
                          </div>
                        </TableCell>
                      );
                    }

                    if (col.id === "balance" && info.balance) {
                      return (
                        <TableCell
                          key={col.id}
                          className={cn("py-2.5 pl-4 pr-4", col.columnDef.meta?.cellClassName)}
                        >
                          {info.balance}
                        </TableCell>
                      );
                    }

                    return <TableCell key={col.id} />;
                  })}
                </TableRow>

                {!isCollapsed &&
                  section.rows.map((row) => (
                    <DataRow
                      key={row.id}
                      row={row}
                      onRowClick={onRowClick}
                    />
                  ))}
              </TableBody>
            );
          })
        ) : (
          <TableBody>
            {rows.map((row) => (
              <DataRow
                key={row.id}
                row={row}
                onRowClick={onRowClick}
              />
            ))}
          </TableBody>
        )}
      </Table>

      {!loading && rows.length === 0 && emptyState && (
        <div className="flex items-center justify-center p-12">
          {emptyState}
        </div>
      )}
    </div>
  );
}

interface DataRowProps<TData> {
  row: Row<TData>;
  onRowClick?: (row: TData) => void;
}

function DataRow<TData>({ row, onRowClick }: DataRowProps<TData>) {
  return (
    <TableRow
      className="hover:bg-muted/30 cursor-pointer"
      onClick={() => onRowClick?.(row.original)}
    >
      {row.getVisibleCells().map((cell, idx) => {
        const isFirst = idx === 0;

        return (
          <TableCell
            key={cell.id}
            className={cn(
              "py-3 px-4",
              isFirst && "pl-4",
              cell.column.columnDef.meta?.cellClassName
            )}
            style={
              cell.column.columnDef.meta?.width
                ? {
                  width: cell.column.columnDef.meta.width,
                  minWidth: cell.column.columnDef.meta.width,
                  maxWidth: cell.column.columnDef.meta.width,
                }
                : undefined
            }
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        );
      })}
    </TableRow>
  );
}