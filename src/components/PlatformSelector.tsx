import type { Platform } from '../types';

type PlatformSelectorProps = {
  platforms: Platform[];
  selectedPlatform: number | null;
  onSelectPlatform: (platformId: number | null) => void;
};

export function PlatformSelector({ platforms, selectedPlatform, onSelectPlatform }: PlatformSelectorProps) {
  return (
    <div className="filter-group">
      <h2>Platforms</h2>
      <div className="pill-list">
        {platforms.map((platform) => (
          <button
            type="button"
            key={platform.id}
            className={`pill-button ${selectedPlatform === platform.id ? 'pill-button--active' : ''}`}
            onClick={() => onSelectPlatform(selectedPlatform === platform.id ? null : platform.id)}
          >
            {platform.name}
          </button>
        ))}
      </div>
    </div>
  );
}
