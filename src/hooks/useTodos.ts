import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import {
  countActiveTodos,
  createTodo,
  filterTodos,
  normalizeTitle,
  todosReducer,
  type TodoFilter,
} from '../model/todo'
import { loadTodos, saveTodos } from '../storage'

export function useTodos() {
  const [todos, dispatch] = useReducer(todosReducer, undefined, loadTodos)
  const [filter, setFilter] = useState<TodoFilter>('all')

  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  const addTodo = useCallback((rawTitle: string): boolean => {
    const title = normalizeTitle(rawTitle)
    if (!title) {
      return false
    }

    dispatch({ type: 'add', todo: createTodo(title) })
    return true
  }, [])

  const toggleTodo = useCallback((id: string) => {
    dispatch({ type: 'toggle', id })
  }, [])

  const deleteTodo = useCallback((id: string) => {
    dispatch({ type: 'delete', id })
  }, [])

  const visibleTodos = useMemo(
    () => filterTodos(todos, filter),
    [todos, filter],
  )

  const activeCount = useMemo(() => countActiveTodos(todos), [todos])

  return {
    todos,
    visibleTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    activeCount,
  }
}
