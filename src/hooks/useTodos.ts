import { useEffect, useMemo, useState } from 'react'
import { loadTodos, saveTodos } from '../storage'
import type { Todo, TodoFilter } from '../types'

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos())
  const [filter, setFilter] = useState<TodoFilter>('all')

  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  const addTodo = (rawTitle: string): boolean => {
    const title = rawTitle.trim()
    if (!title) {
      return false
    }

    const todo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    }

    setTodos((current) => [todo, ...current])
    return true
  }

  const toggleTodo = (id: string) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const deleteTodo = (id: string) => {
    setTodos((current) => current.filter((todo) => todo.id !== id))
  }

  const visibleTodos = useMemo(() => {
    if (filter === 'active') {
      return todos.filter((todo) => !todo.completed)
    }
    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed)
    }
    return todos
  }, [todos, filter])

  const activeCount = todos.filter((todo) => !todo.completed).length

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
