import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_basic,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
} from "@tanstack/react-table";

/**
 * 테이블 기능 집합.
 *
 * TanStack Table v9는 v8과 달리 기능이 **옵트인**입니다. 쓰지 않는 정렬/필터
 * 로직은 번들에 포함되지 않으므로, 필요한 기능만 여기에 등록하고 앱 전체가
 * 이 하나의 집합을 공유합니다.
 *
 * 기능을 추가할 때(행 선택, 그룹핑 등) 이 파일만 수정하면 `DataTable`과 모든
 * 컬럼 정의에 타입이 함께 전파됩니다.
 */
export const tableFeatureSet = tableFeatures({
  rowSortingFeature,
  rowPaginationFeature,
  columnFilteringFeature,
  columnVisibilityFeature,
  globalFilteringFeature,
  sortedRowModel: createSortedRowModel(),
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    basic: sortFn_basic,
    datetime: sortFn_datetime,
    text: sortFn_text,
  },
});

export type TableFeatureSet = typeof tableFeatureSet;
