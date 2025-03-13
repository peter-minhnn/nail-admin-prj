import { flexRender, Row } from '@tanstack/react-table'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { v4 as uuid } from 'uuid'
import { TableCell, TableRow } from '@/components/ui'
import { PostsDataType } from '@/features/posts/data/schema.ts'

// Sortable Row Component
export const PostsSortableRow = ({
  row,
  isOver,
}: {
  row: Row<PostsDataType>
  isOver: boolean
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: row.id,
  })

  const style = {
    transform: CSS.Transform.toString({
      ...(transform as any),
      scaleY: isDragging ? 1.02 : 1, // Slight scale when dragging
    }),
    transition: isDragging ? 'all 0.2s ease' : transition,
    boxShadow: isDragging ? '0 4px 12px rgba(0,0,0,0.2)' : 'none',
    backgroundColor: isOver && !isDragging ? '#f0f9ff' : 'white', // Highlight drop target
    border: isOver && !isDragging ? '2px dashed #3b82f6' : '',
    opacity: isDragging ? 0.9 : 1,
    zIndex: isDragging ? 1 : 0,
  }

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      key={row.id}
      data-state={row.getIsSelected() && 'selected'}
    >
      {/* Drag Handle */}
      <TableCell
        id={uuid()}
        className='min-w-12 cursor-move p-2 text-center'
        {...attributes}
        {...listeners}
      >
        ⋮⋮
      </TableCell>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}
