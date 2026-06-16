export default function SearchBar({ value, onChange, placeholder = 'Search…', style }) {
  return (
    <div className="search-bar" style={style}>
      <span className="search-icon">🔍</span>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem', padding: 0 }}
        >×</button>
      )}
    </div>
  )
}