import { flexRender, Row } from '@tanstack/react-table'
import { TableCell, TableRow } from '@/components/(admin)/ui'
import { PopupDataType } from '@/features/(admin)/popup/data/schema.ts'

// Sortable Row Component
export const PopupRow = ({ row }: { row: Row<PopupDataType> }) => {
  return (
    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}
