import { isTodo, type Todo } from './model/todo'

const STORAGE_KEY = 'todos'

export function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return []
    }

    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter(isTodo)
  } catch {
    return []
  }
}

export function saveTodos(todos: readonly Todo[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  } catch {
    // QuotaExceededError or private mode: keep working in memory.
  }
}
