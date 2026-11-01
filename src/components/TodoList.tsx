import { useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

import type { Todo } from '../model/todo'
import { TodoItem } from './TodoItem'

type TodoListProps = {
  todos: readonly Todo[]
  emptyLabel: string
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

const ROW_ESTIMATE = 64
const ROW_GAP = 8
const OVERSCAN = 8

export function TodoList({
  todos,
  emptyLabel,
  onToggle,
  onDelete,
}: TodoListProps) {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: todos.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_ESTIMATE,
    gap: ROW_GAP,
    overscan: OVERSCAN,
    getItemKey: (index) => todos[index]?.id ?? index,
  })

  if (todos.length === 0) {
    return <p className="todo-list__empty">{emptyLabel}</p>
  }
  
  return (
    <div ref={parentRef} className="todo-list-viewport">
      <ul
        className="todo-list"
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const todo = todos[virtualRow.index]

          if (!todo) {
            return null
          }

          return (
            <li
              key={virtualRow.key}
              ref={virtualizer.measureElement}
              data-index={virtualRow.index}
              className="todo-list__row"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
              }}
              aria-setsize={todos.length}
              aria-posinset={virtualRow.index + 1}
            >
              <TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
