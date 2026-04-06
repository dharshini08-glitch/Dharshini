type SortSelectorProps = {
  sortOrder: string;
  onSortChange: (sortOrder: string) => void;
};

const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'date_added', label: 'Date added' },
  { value: 'name', label: 'Name' },
  { value: 'released', label: 'Release date' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'rating', label: 'Average rating' }
];

export function SortSelector({ sortOrder, onSortChange }: SortSelectorProps) {
  return (
    <div className="filter-group">
      <h2>Sort</h2>
      <select
        value={sortOrder}
        onChange={(event) => onSortChange(event.target.value)}
        className="select-input"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
