import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { atom } from 'jotai'
import { useState } from 'react'
import { DragItem } from './DragItem'
import { DropItem } from './DropItem'

type widgetType = {
  x: number
  y: number
  name: string
}

const widget = atom('a')

function DndGrid(props: { width: number; height: number }) {
  const rowArr = [...new Array(props.height)].map((_, i) => i + 1)
  const columnArr = [...new Array(props.width)].map((_, i) => i + 1)

  return (
    <div>
      {columnArr.map((i, key) => {
        return (
          <div key={key} style={{ float: 'left' }}>
            {rowArr.map((j, key) => {
              return (
                <DropItem id={i + 'r' + j + 'c'} key={key}>
                  {i + 'r' + j + 'c'}
                </DropItem>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export function TestComponent() {
  const [isDropped, setIsDropped] = useState(false)
  const draggableMarkup = <DragItem id='drag1'>drag me</DragItem>
  function handleDragEnd(event: DragEndEvent) {
    if (event.over) {
      setIsDropped(true)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!isDropped ? draggableMarkup : null}

      <DndGrid width={5} height={3} />
      {/* <DropItem id='drop1'>
        {isDropped ? draggableMarkup : 'drop here'}
      </DropItem> */}
    </DndContext>
  )
}
