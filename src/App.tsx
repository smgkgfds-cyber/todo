import { FilterBar } from './components/FilterBar'
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'
import { useTodos } from './hooks/useTodos'
import './App.css'

function App() {
  const {
    todos,
    visibleTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    activeCount,
  } = useTodos()

  return (
    <main className="app">
      <header className="app__header">
        <h1>Список задач</h1>
        <p>Добавляйте дела, отмечайте выполненное и фильтруйте список.</p>
      </header>

      <TodoForm onAdd={addTodo} />
      <FilterBar
        value={filter}
        onChange={setFilter}
        activeCount={activeCount}
        totalCount={todos.length}
      />
      <TodoList todos={visibleTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </main>
  )
}

export default App
