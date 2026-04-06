import { GameCard } from './GameCard';
import { Skeleton } from './Skeleton';
import type { Game } from '../types';

type GameGridProps = {
  games: Game[];
  loading: boolean;
};

export function GameGrid({ games, loading }: GameGridProps) {
  if (loading) {
    return (
      <div className="game-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  }

  if (!games.length) {
    return <div className="empty-state">No games matched your search and filters.</div>;
  }

  return (
    <div className="game-grid">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
