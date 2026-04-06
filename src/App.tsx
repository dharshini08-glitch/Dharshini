import { useEffect, useState } from 'react';
import { HomePage } from './pages/HomePage';
import { Navbar } from './components/Navbar';
import type { FilterState } from './types';

function App() {
  const [filters, setFilters] = useState<FilterState>({
    searchText: '',
    selectedGenre: null,
    selectedPlatform: null,
    sortOrder: 'relevance'
  });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  const handleFilterChange = (updates: Partial<FilterState>) => {
    setFilters((current: FilterState) => ({ ...current, ...updates }));
  };

  return (
    <div className="app-shell">
      <Navbar
        searchText={filters.searchText}
        onSearchTextChange={(searchText) => handleFilterChange({ searchText })}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((previous) => !previous)}
      />

      <main className="app-content">
        <HomePage filters={filters} onFilterChange={handleFilterChange} />
      </main>
    </div>
  );
}

export default App;
