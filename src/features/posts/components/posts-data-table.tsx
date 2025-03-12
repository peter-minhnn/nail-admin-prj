import {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  getExpandedRowModel,
  ExpandedState,
  Updater,
  PaginationState,
} from '@tanstack/react-table'
import { PostsFilterParams } from '@/types'
import { FormattedMessage } from 'react-intl'
import { v4 as uuid } from 'uuid'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination } from '@/components/tables'
import { Skeleton } from '@/components/ui'
import { PostsDataTableToolbar } from '@/features/posts/components'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  toolBarChildren?: ReactNode
  languagePrefix: string
  loading?: boolean
  expandedRow?: boolean
  expandedKey?: string
  expanded?: ExpandedState
  setExpanded?: Dispatch<SetStateAction<ExpandedState>>
  suppressShowToolbar?: boolean
  pagination?: PaginationState
  rowCount?: number
  onPaginationChange?: (pagination: Updater<PaginationState>) => void
  setFilterParams: Dispatch<SetStateAction<PostsFilterParams>>
}

export function PostsDataTable<TData, TValue>({
  columns,
  data,
  languagePrefix,
  loading,
  expandedKey,
  expandedRow,
  setExpanded,
  expanded,
  suppressShowToolbar = false,
  pagination,
  rowCount,
  onPaginationChange,
  setFilterParams,
}: Readonly<DataTableProps<TData, TValue>>) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [tableLoading, setTableLoading] = useState<boolean>(true)

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      ...(expandedRow ? { expanded } : {}),
      ...(pagination ? { pagination } : {}),
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    ...(!pagination ? { getPaginationRowModel: getPaginationRowModel() } : {}), //client-side pagination
    ...(pagination
      ? {
          onPaginationChange,
          rowCount: rowCount ?? 0,
          manualPagination: true,
        }
      : {}), //server-side pagination
    ...(expandedRow
      ? {
          getExpandedRowModel: getExpandedRowModel(),
          getSubRows: (row: TData) => row[expandedKey as keyof TData] as any,
          onExpandedChange: setExpanded,
        }
      : {}),
  })

  const memoizedLoading: ReactElement | ReactElement[] | null = useMemo(() => {
    if (!table.getRowModel().rows?.length && !tableLoading) {
      return (
        <TableRow key={uuid()}>
          <TableCell
            key={uuid()}
            colSpan={columns.length}
            className='h-24 text-center'
          >
            <FormattedMessage id='common.noResults' />
          </TableCell>
        </TableRow>
      )
    }

    if (!tableLoading) return null

    return Array.from({ length: 5 }).map((_: any) => (
      <TableRow key={uuid()} className='h-16'>
        {columns.map((column) => (
          <TableCell key={column.id}>
            <Skeleton className='h-5' />
          </TableCell>
        ))}
      </TableRow>
    ))
  }, [tableLoading, table.getRowModel().rows])

  useEffect(() => {
    if (!loading) {
      setTimeout(() => setTableLoading(false), 500)
    }

    return () => setTableLoading(true)
  }, [loading])

  return (
    <div className='space-y-4'>
      {!suppressShowToolbar && (
        <PostsDataTableToolbar
          table={table}
          languagePrefix={languagePrefix}
          setFilterParams={setFilterParams}
        />
      )}
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length && !tableLoading
              ? table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : memoizedLoading}
          </TableBody>
        </Table>
      </div>
      {Boolean(data?.length) && <DataTablePagination table={table} />}
    </div>
  )
}
