"use client";

import * as React from "react";
import {
  flexRender,
  useTable,
  type Column,
  type ColumnDef,
  type ColumnVisibilityState,
  type RowData,
  type SortingState,
} from "@tanstack/react-table";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  SearchIcon,
  Settings2Icon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tableFeatureSet, type TableFeatureSet } from "@/lib/table";

const PAGE_SIZES = [10, 20, 30, 50] as const;

/** URL 쿼리에는 기본값을 쓰지 않아 주소가 깔끔하게 유지됩니다. */
const queryOptions = { shallow: true, clearOnDefault: true } as const;

/** 컬럼 정의에 붙일 수 있는 메타. 열 표시 토글의 라벨로 쓰입니다. */
export type ColumnMeta = { label?: string };

export type AppColumnDef<TData extends RowData> = ColumnDef<
  TableFeatureSet,
  TData
>;

type DataTableProps<TData extends RowData> = {
  columns: AppColumnDef<TData>[];
  data: TData[];
  /** 전역 검색 입력의 placeholder. 생략하면 검색창을 숨깁니다. */
  searchPlaceholder?: string;
  /** 데이터가 0건일 때 표시할 내용. */
  emptyState?: React.ReactNode;
  /** 툴바 우측에 끼워 넣을 추가 액션. */
  toolbarActions?: React.ReactNode;
};

/**
 * 제네릭 데이터 테이블.
 *
 * 정렬·필터·페이지네이션은 직접 구현하지 않고 `@tanstack/react-table` v9의
 * 헤드리스 엔진에 위임합니다. 사용할 기능은 `@/lib/table`의 `tableFeatureSet`에
 * 등록되어 있습니다.
 *
 * 검색어·페이지·페이지 크기는 `nuqs`로 URL 쿼리스트링에 동기화되므로 현재
 * 화면을 그대로 공유·북마크할 수 있습니다.
 *
 * 도메인 지식은 `columns` 정의에만 두고 이 컴포넌트에는 넣지 마세요.
 */
export function DataTable<TData extends RowData>({
  columns,
  data,
  searchPlaceholder,
  emptyState,
  toolbarActions,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>({});

  const [search, setSearch] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions(queryOptions),
  );
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions(queryOptions),
  );
  const [pageSize, setPageSize] = useQueryState(
    "size",
    parseAsInteger.withDefault(10).withOptions(queryOptions),
  );

  const table = useTable(
    {
      features: tableFeatureSet,
      data,
      columns,
      globalFilterFn: "includesString",
      state: {
        sorting,
        columnVisibility,
        globalFilter: search,
        pagination: { pageIndex: page - 1, pageSize },
      },
      onSortingChange: setSorting,
      onColumnVisibilityChange: setColumnVisibility,
      onGlobalFilterChange: (updater) => {
        const next =
          typeof updater === "function" ? updater(search) : (updater as string);
        void setSearch(next);
        void setPage(1); // 검색어가 바뀌면 항상 첫 페이지로
      },
      onPaginationChange: (updater) => {
        const current = { pageIndex: page - 1, pageSize };
        const next = typeof updater === "function" ? updater(current) : updater;
        void setPage(next.pageIndex + 1);
        void setPageSize(next.pageSize);
      },
    },
    (state) => state,
  );

  const pageCount = table.getPageCount();
  const filteredCount = table.getFilteredRowModel().rows.length;

  // 필터링 결과가 줄어 현재 페이지가 사라진 경우 첫 페이지로 되돌립니다.
  React.useEffect(() => {
    if (pageCount > 0 && page > pageCount) {
      void setPage(1);
    }
  }, [page, pageCount, setPage]);

  const rows = table.getRowModel().rows;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        {searchPlaceholder ? (
          <InputGroup className="sm:max-w-xs">
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              value={search}
              placeholder={searchPlaceholder}
              onChange={(event) => table.setGlobalFilter(event.target.value)}
              aria-label="검색"
            />
          </InputGroup>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-2">
          {toolbarActions}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" size="sm">
                  <Settings2Icon />
                  <span className="hidden sm:inline">열</span>
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>표시할 열</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(checked) =>
                      column.toggleVisibility(checked)
                    }
                    closeOnClick={false}
                  >
                    {(column.columnDef.meta as ColumnMeta | undefined)?.label ??
                      column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columns.length} className="p-0">
                  {emptyState ?? (
                    <div className="p-10 text-center text-sm text-muted-foreground">
                      결과가 없습니다.
                    </div>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col-reverse items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted-foreground tabular-nums">
          전체 {filteredCount}건
        </p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-muted-foreground sm:inline">
              페이지당
            </span>
            <Select
              value={String(pageSize)}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
                void setPage(1);
              }}
            >
              <SelectTrigger size="sm" className="w-[4.5rem]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZES.map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <span className="text-sm text-muted-foreground tabular-nums">
            {Math.min(page, Math.max(pageCount, 1))} / {Math.max(pageCount, 1)}
          </span>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="첫 페이지"
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeftIcon />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="이전 페이지"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="다음 페이지"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="마지막 페이지"
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 정렬 가능한 컬럼 헤더. `columns.tsx`에서 `header`로 사용합니다.
 *
 * ```tsx
 * header: ({ column }) => <DataTableColumnHeader column={column} title="이름" />
 * ```
 */
export function DataTableColumnHeader<TData extends RowData, TValue>({
  column,
  title,
}: {
  column: Column<TableFeatureSet, TData, TValue>;
  title: string;
}) {
  if (!column.getCanSort()) {
    return <span>{title}</span>;
  }

  const sorted = column.getIsSorted();
  const Icon =
    sorted === "asc"
      ? ArrowUpIcon
      : sorted === "desc"
        ? ArrowDownIcon
        : ArrowUpDownIcon;

  return (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-2 h-7 data-sorted:text-foreground"
      data-sorted={sorted ? true : undefined}
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      {title}
      <Icon className="size-3.5 text-muted-foreground" />
    </Button>
  );
}
