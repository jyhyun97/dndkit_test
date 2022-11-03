import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export function SortableItem(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: 'solid 1px black',
    width: '100px',
    height: '100px',
    background: '#ffff0088',
    gridColumn: 'auto',
    gridRow: 'auto',
  }
  if (props.id === 3) {
    style.width = '200px'
    style.height = '200px'
    style.gridColumn = '1 / 3'
    style.gridRow = '1 / 3'
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.id}
    </div>
  )
}
