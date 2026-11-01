import { cx } from '../lib/cx'
import { TODO_FILTERS, type TodoFilter } from '../model/todo'

type FilterBarProps = {
  value: TodoFilter
  onChange: (filter: TodoFilter) => void
  activeCount: number
  totalCount: number
}

export function FilterBar({
  value,
  onChange,
  activeCount,
  totalCount,
}: FilterBarProps) {
  return (
    <div className="filters">
      <p className="filters__count">
        Осталось: {activeCount} из {totalCount}
      </p>
      <div className="filters__buttons" role="group" aria-label="Фильтр задач">
        {TODO_FILTERS.map((filter) => {
          const selected = value === filter.id

          return (
            <button
              key={filter.id}
              type="button"
              className={cx(
                'filters__button',
                selected && 'filters__button--active',
              )}
              aria-pressed={selected}
              onClick={() => onChange(filter.id)}
            >
              {filter.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
