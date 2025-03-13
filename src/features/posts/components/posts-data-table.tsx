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
import { cloneDeep } from 'lodash'
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
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
import { PostsDataTableToolbar, PostsSortableRow } from '@/features/posts/components'
import { PostsDataType } from '@/features/posts/data/schema.ts'
import { SortDataType } from '@/types/posts.type.ts'

interface DataTableProps {
  columns: ColumnDef<PostsDataType>[]
  data: PostsDataType[]
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
  setSortData: Dispatch<SetStateAction<SortDataType>>
}

export function PostsDataTable({
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
                                 setSortData
                                              }: Readonly<DataTableProps>) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [tableLoading, setTableLoading] = useState<boolean>(true)
  const [overId, setOverId] = useState(null);

  const table = useReactTable<PostsDataType>({
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
    getRowId: (row) => String(row.id),
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
        getSubRows: (row) => row[expandedKey as keyof PostsDataType],
        onExpandedChange: setExpanded,
      }
      : {}),
  })

  const handleDragStart = (_: any) => {
    setOverId(null); // Reset on drag start
  };

  const handleDragOver = (event: any) => {
    if (event.over && event.over.id !== event.active.id) {
      setOverId(event.over.id);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setOverId(null); // Clear highlight
    if (active.id !== over.id) {
      let newData = cloneDeep(data);
      const oldIndex = data.findIndex((item) => item.id === Number(active.id));
      const newIndex = data.findIndex((item) => item.id === Number(over.id));
      newData[oldIndex].sortOrder = data[newIndex].sortOrder!
      newData[newIndex].sortOrder = data[oldIndex].sortOrder!;
      newData = newData.filter((item) => item.id === Number(active.id) || item.id === Number(over.id));
      setSortData({
        isDragEnd: true,
        newRows: [...newData],
      })
    }
  };

  const memoizedLoading: ReactElement | ReactElement[] | null = useMemo(() => {
    if (!table.getRowModel().rows?.length && !tableLoading) {
      return (
        <TableRow key={uuid()}>
          <TableCell
            key={uuid()}
            colSpan={columns.length}
            className="h-24 text-center"
          >
            <FormattedMessage id="common.noResults" />
          </TableCell>
        </TableRow>
      )
    }

    if (!tableLoading) return null

    return Array.from({ length: 5 }).map((_: any) => (
      <TableRow key={uuid()} className="h-16">
        {columns.map((column) => (
          <TableCell key={column.id}>
            <Skeleton className="h-5" />
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
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-4">
        {!suppressShowToolbar && (
          <PostsDataTableToolbar
            table={table}
            languagePrefix={languagePrefix}
            setFilterParams={setFilterParams}
          />
        )}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  <TableHead></TableHead>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              <SortableContext
                items={data.map(row => row.id) as number[]}
                strategy={verticalListSortingStrategy}
              >
                {table.getRowModel().rows?.length && !tableLoading
                  ? table.getRowModel().rows.map((row) => (
                    <PostsSortableRow key={row.id} row={row} isOver={overId === row.id}/>
                  ))
                  : memoizedLoading}
              </SortableContext>
            </TableBody>
          </Table>
        </div>
        {Boolean(data?.length) && <DataTablePagination table={table} />}
      </div>
    </DndContext>
  )
}
