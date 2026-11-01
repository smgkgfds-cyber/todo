import type { TodoFilter } from '../types'

type FilterBarProps = {
  value: TodoFilter
  onChange: (filter: TodoFilter) => void
  activeCount: number
  totalCount: number
}

const FILTERS: { id: TodoFilter; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'active', label: 'Активные' },
  { id: 'completed', label: 'Выполненные' },
]

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
      <div className="filters__buttons" role="tablist" aria-label="Фильтр задач">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={
              value === filter.id
                ? 'filters__button filters__button--active'
                : 'filters__button'
            }
            onClick={() => onChange(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  )
}
