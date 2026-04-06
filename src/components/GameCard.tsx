import type { Game } from '../types';

type GameCardProps = {
  game: Game;
};

export function GameCard({ game }: GameCardProps) {
  const platforms = game.parent_platforms.map((entry) => entry.platform.name).join(' · ');

  return (
    <article className="game-card">
      <div className="card-image">
        {game.background_image ? (
          <img src={game.background_image} alt={game.name} />
        ) : (
          <div className="skeleton-image skeleton-block" />
        )}
      </div>
      <div className="card-body">
        <h3 className="card-title">{game.name}</h3>
        <div className="card-meta">
          <span className="card-badge">⭐ {game.rating.toFixed(1)}</span>
          {game.released ? <span>{game.released}</span> : <span>Release date unknown</span>}
        </div>
        <div className="card-platforms">
          {platforms.split(' · ').map((platform) => (
            <span key={platform} className="platform-pill">
              {platform}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
