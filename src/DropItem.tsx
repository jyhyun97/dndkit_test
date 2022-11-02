import { useDroppable } from '@dnd-kit/core'
import { useState } from 'react'
import { DragItem } from './DragItem'
import { propType } from './types'

export function DropItem(props: propType) {
  const [isDropped, setIsDropped] = useState(false)
  const draggableMarkup = <DragItem id='drag1'>drag me</DragItem>
  function handleDragEnd(event: any) {
    if (event.over) {
      setIsDropped(true)
    }
    console.log('test')
  }
  const { setNodeRef } = useDroppable({ id: props.id })

  return (
    <div
      style={{ width: '100px', height: '100px', border: 'solid 1px black' }}
      ref={setNodeRef}
    >
      {props.children}
      {isDropped ? draggableMarkup : null}
    </div>
  )
}
