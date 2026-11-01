import { type FormEvent, useId, useState } from 'react'

type TodoFormProps = {
  onAdd: (title: string) => boolean
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')
  const errorId = useId()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const added = onAdd(title)
    if (!added) {
      setError('Введите текст задачи')
      return
    }

    setTitle('')
    setError('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="todo-form__row">
        <input
          className="todo-form__input"
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
            if (error) {
              setError('')
            }
          }}
          placeholder="Новая задача"
          aria-label="Текст задачи"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
        <button className="todo-form__button" type="submit">
          Добавить
        </button>
      </div>
      {error ? (
        <p id={errorId} className="todo-form__error" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  )
}
