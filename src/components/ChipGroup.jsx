export default function ChipGroup({ label, options, value, onChange }) {
  return (
    <div className="filter-row" role="group" aria-label={label}>
      <span className="filter-label">{label}</span>
      <div className="chips">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={option.id === value ? 'chip chip-on' : 'chip'}
            aria-pressed={option.id === value}
            onClick={() => onChange(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
