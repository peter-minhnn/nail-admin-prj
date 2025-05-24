import { flexRender, Row } from '@tanstack/react-table'
import { SubscibesType } from '@/types/contact.type.ts'
import { TableCell, TableRow } from '@/components/(admin)/ui'

// Sortable Row Component
export const SubscribeRow = ({ row }: { row: Row<SubscibesType> }) => {
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
