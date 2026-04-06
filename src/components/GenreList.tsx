import type { Genre } from '../types';

type GenreListProps = {
  genres: Genre[];
  selectedGenre: number | null;
  onSelectGenre: (genreId: number | null) => void;
};

export function GenreList({ genres, selectedGenre, onSelectGenre }: GenreListProps) {
  return (
    <div className="filter-group">
      <h2>Genres</h2>
      <div className="pill-list">
        {genres.map((genre) => (
          <button
            type="button"
            key={genre.id}
            className={`pill-button ${selectedGenre === genre.id ? 'pill-button--active' : ''}`}
            onClick={() => onSelectGenre(selectedGenre === genre.id ? null : genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
}
