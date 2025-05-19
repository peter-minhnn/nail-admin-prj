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
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Updater,
  PaginationState,
} from '@tanstack/react-table'
import { PopupFilterParams } from '@/types'
import { FormattedMessage } from 'react-intl'
import { v4 as uuid } from 'uuid'
import { DataTablePagination } from '@/components/(admin)/tables'
import { Skeleton } from '@/components/(admin)/ui'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/(admin)/ui/table.tsx'
import { PopupDataTableToolbar } from '@/features/(admin)/popup/components/popup-data-table-toolbar.tsx'
import { PopupRow } from '@/features/(admin)/popup/components/popup-row.tsx'
import { PopupDataType } from '@/features/(admin)/popup/data/schema.ts'

interface DataTableProps {
  columns: ColumnDef<PopupDataType>[]
  data: PopupDataType[]
  toolBarChildren?: ReactNode
  languagePrefix: string
  loading?: boolean
  suppressShowToolbar?: boolean
  pagination?: PaginationState
  rowCount?: number
  onPaginationChange?: (pagination: Updater<PaginationState>) => void
  setFilterParams: Dispatch<SetStateAction<PopupFilterParams>>
}

export function PopupDataTable({
  columns,
  data,
  languagePrefix,
  loading,
  suppressShowToolbar = false,
  pagination,
  rowCount,
  onPaginationChange,
  setFilterParams,
}: Readonly<DataTableProps>) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [tableLoading, setTableLoading] = useState<boolean>(true)

  const table = useReactTable<PopupDataType>({
    data,
    columns,
    state: {
      columnVisibility,
      rowSelection,
      columnFilters,
      ...(pagination ? { pagination } : {}),
    },
    getRowId: (row) => String(row.id),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
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
      : {}),
  })

  const memoizedLoading: ReactElement | ReactElement[] | null = useMemo(() => {
    if (!table.getRowModel().rows?.length && !tableLoading) {
      return (
        <TableRow key={uuid()}>
          <TableCell
            key={uuid()}
            colSpan={columns.length + 1}
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
        {columns.map(() => (
          <TableCell key={uuid()}>
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
        <PopupDataTableToolbar
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
              ? table
                  .getRowModel()
                  .rows.map((row) => <PopupRow key={row.id} row={row} />)
              : memoizedLoading}
          </TableBody>
        </Table>
      </div>
      {Boolean(data?.length) && <DataTablePagination table={table} />}
    </div>
  )
}
