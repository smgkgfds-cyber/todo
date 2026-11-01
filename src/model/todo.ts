export type TodoFilter = 'all' | 'active' | 'completed'

export type Todo = {
  id: string
  title: string
  completed: boolean
}

export const TODO_FILTERS = [
  { id: 'all', label: 'Все' },
  { id: 'active', label: 'Активные' },
  { id: 'completed', label: 'Выполненные' },
] as const satisfies ReadonlyArray<{ id: TodoFilter; label: string }>

export const EMPTY_LIST_COPY: Record<TodoFilter, string> = {
  all: 'Задач пока нет',
  active: 'Нет активных задач',
  completed: 'Нет выполненных задач',
}

export function normalizeTitle(rawTitle: string): string {
  return rawTitle.trim()
}

export function createTodo(title: string): Todo {
  return {
    id: crypto.randomUUID(),
    title,
    completed: false,
  }
}

export function isTodo(value: unknown): value is Todo {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as Partial<Todo>
  return (
    typeof candidate.id === 'string' &&
    candidate.id.length > 0 &&
    typeof candidate.title === 'string' &&
    typeof candidate.completed === 'boolean'
  )
}

export function filterTodos(
  todos: readonly Todo[],
  filter: TodoFilter,
): readonly Todo[] {
  switch (filter) {
    case 'active':
      return todos.filter((todo) => !todo.completed)
    case 'completed':
      return todos.filter((todo) => todo.completed)
    case 'all':
      return todos
  }
}

export function countActiveTodos(todos: readonly Todo[]): number {
  return todos.reduce((count, todo) => count + Number(!todo.completed), 0)
}

export type TodosAction =
  | { type: 'add'; todo: Todo }
  | { type: 'toggle'; id: string }
  | { type: 'delete'; id: string }

export function todosReducer(state: Todo[], action: TodosAction): Todo[] {
  switch (action.type) {
    case 'add':
      return [action.todo, ...state]
    case 'toggle':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo,
      )
    case 'delete':
      return state.filter((todo) => todo.id !== action.id)
  }
}
