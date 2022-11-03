import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  horizontalListSortingStrategy,
  rectSortingStrategy,
  rectSwappingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import { SortableItem } from './SortableItem'

function Grid(props: { children: any }) {
  return (
    <div
      style={{
        display: 'inline-grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridGap: 10,
      }}
    >
      {props.children}
    </div>
  )
}

function App() {
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={rectSwappingStrategy}>
        <Grid>
          {items.map((ele, index) => (
            <SortableItem key={ele} id={ele} />
          ))}
        </Grid>
      </SortableContext>
    </DndContext>
  )

  function handleDragEnd(event: any) {
    const { active, over } = event

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }
}
// import { TestComponent } from './TestComponent'

// function App() {
//   return (
//     <div>
//       <h1>dnd kit 테스트 페이지입니다.</h1>
//       <TestComponent />
//     </div>
//   )
// }

export default App
