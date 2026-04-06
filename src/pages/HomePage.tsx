import { useMemo, useState } from 'react';
import { useGames } from '../hooks/useGames';
import { useGenres } from '../hooks/useGenres';
import { usePlatforms } from '../hooks/usePlatforms';
import { GameGrid } from '../components/GameGrid';
import { GenreList } from '../components/GenreList';
import { PlatformSelector } from '../components/PlatformSelector';
import { SortSelector } from '../components/SortSelector';
import type { FilterState } from '../types';

export type HomePageProps = {
  filters: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
};

export function HomePage({ filters, onFilterChange }: HomePageProps) {
  const [showOnlyMyPlatforms, setShowOnlyMyPlatforms] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const genres = useGenres();
  const platforms = usePlatforms();
  const { data: games, loading, error } = useGames(filters);

  const activeFilters = useMemo(() => {
    const active: string[] = [];
    if (filters.searchText) active.push(`Search: ${filters.searchText}`);
    if (filters.selectedGenre) {
      const genre = genres.find((item) => item.id === filters.selectedGenre);
      if (genre) active.push(`Genre: ${genre.name}`);
    }
    if (filters.selectedPlatform) {
      const platform = platforms.find((item) => item.id === filters.selectedPlatform);
      if (platform) active.push(`Platform: ${platform.name}`);
    }
    if (showOnlyMyPlatforms) active.push('Only my platforms');
    return active;
  }, [filters, genres, platforms, showOnlyMyPlatforms]);

  return (
    <section className="home-page">
      <button
        type="button"
        className="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      <div className="page-header">
        <div>
          <h1>Discover the latest video games</h1>
          <p>Browse curated games, filter by genre and platform, and sort by popularity, release date, and ratings.</p>
        </div>
      </div>

      <div className={`home-layout ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        {isMobileMenuOpen && <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>}

        <aside className={`sidebar-panel ${isMobileMenuOpen ? 'sidebar-open' : ''}`}>
          <div className="sidebar-section">
            <h3>New Releases</h3>
            <button type="button" className="sidebar-link active">Last 30 days</button>
            <button type="button" className="sidebar-link">This week</button>
            <button type="button" className="sidebar-link">Next week</button>
            <button type="button" className="sidebar-link">Release calendar</button>
          </div>

          <div className="sidebar-section">
            <h3>Top</h3>
            <button type="button" className="sidebar-link">Best of the year</button>
            <button type="button" className="sidebar-link">Popular in 2022</button>
            <button type="button" className="sidebar-link">All time top 250</button>
          </div>

          <div className="sidebar-section mobile-genres">
            <GenreList selectedGenre={filters.selectedGenre} genres={genres} onSelectGenre={(genreId) => {
              onFilterChange({ selectedGenre: genreId });
              setIsMobileMenuOpen(false); // Close mobile menu after selection
            }} />
          </div>
        </aside>

        <div className="main-panel">
          <div className="top-bar">
            <div className="top-bar-left">
              <span className="top-bar-label">Order by:</span>
              <div className="top-bar-group">
                <SortSelector sortOrder={filters.sortOrder} onSortChange={(value) => onFilterChange({ sortOrder: value })} />
              </div>
            </div>

            <div className="top-bar-right">
              <div className="inline-control">
                <label className="toggle-label">Only my platforms</label>
                <button
                  type="button"
                  className={`pill-button ${showOnlyMyPlatforms ? 'pill-button--active' : ''}`}
                  onClick={() => setShowOnlyMyPlatforms((prev) => !prev)}
                >
                  {showOnlyMyPlatforms ? 'On' : 'Off'}
                </button>
              </div>
              <div className="display-actions">
                <button type="button" className="secondary-button">Grid</button>
                <button type="button" className="secondary-button">List</button>
              </div>
            </div>
          </div>

          <div className="filter-row">
            <PlatformSelector selectedPlatform={filters.selectedPlatform} platforms={platforms} onSelectPlatform={(platformId) => onFilterChange({ selectedPlatform: platformId })} />
          </div>

          <div className="filter-group result-summary">
            <h2>Results</h2>
            <p>
              {loading
                ? 'Loading games...'
                : `${games.length} games found${activeFilters.length ? ` · ${activeFilters.join(' · ')}` : ''}`}
            </p>
          </div>

          {error ? <div className="error-text">{error}</div> : <GameGrid games={games} loading={loading} />}
        </div>
      </div>
    </section>
  );
}
