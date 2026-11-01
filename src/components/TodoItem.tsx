import type { Todo } from '../types'

type TodoItemProps = {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={todo.completed ? 'todo-item todo-item--completed' : 'todo-item'}>
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
    </li>
  )
}
