import { memo } from 'react'
import { cx } from '../lib/cx'
import type { Todo } from '../model/todo'

type TodoItemProps = {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export const TodoItem = memo(function TodoItem({
  todo,
  onToggle,
  onDelete,
}: TodoItemProps) {
  return (
    <div className={cx('todo-item', todo.completed && 'todo-item--completed')}>
      <label className="todo-item__label">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className="todo-item__title">{todo.title}</span>
      </label>
      <button
        type="button"
        className="todo-item__delete"
        onClick={() => onDelete(todo.id)}
        aria-label={`Удалить задачу «${todo.title}»`}
      >
        Удалить
      </button>
    </div>
  )
})
