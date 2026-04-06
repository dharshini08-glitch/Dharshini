import type { FilterState, Game } from '../types';
import { apiClient, hasApiKey } from './api-client';

const sortMapping: Record<string, string | undefined> = {
  relevance: undefined,
  date_added: '-added',
  name: 'name',
  released: '-released',
  popularity: '-metacritic',
  rating: '-rating'
};

const fallbackGames: Game[] = [
  {
    id: 1,
    name: 'Cyberpunk Edge',
    rating: 4.5,
    released: '2025-09-16',
    background_image: 'https://images.pexels.com/photos/1002081/pexels-photo-1002081.jpeg?auto=compress&cs=tinysrgb&w=800',
    parent_platforms: [{ platform: { id: 1, name: 'PC', slug: 'pc' } }, { platform: { id: 187, name: 'PlayStation', slug: 'playstation' } }]
  },
  {
    id: 2,
    name: 'Ancient Quest',
    rating: 4.2,
    released: '2024-11-10',
    background_image: 'https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&w=800',
    parent_platforms: [{ platform: { id: 1, name: 'PC', slug: 'pc' } }, { platform: { id: 6, name: 'Linux', slug: 'linux' } }]
  },
  {
    id: 3,
    name: 'Sky Racer',
    rating: 3.9,
    released: '2025-02-22',
    background_image: 'https://images.pexels.com/photos/4386433/pexels-photo-4386433.jpeg?auto=compress&cs=tinysrgb&w=800',
    parent_platforms: [{ platform: { id: 1, name: 'PC', slug: 'pc' } }, { platform: { id: 186, name: 'Xbox', slug: 'xbox' } }]
  }
];

export async function fetchGames(query: FilterState, signal?: AbortSignal): Promise<Game[]> {
  if (!hasApiKey) {
    return fallbackGames.filter((game) => {
      const matchesSearch = query.searchText
        ? game.name.toLowerCase().includes(query.searchText.toLowerCase())
        : true;
      const matchesPlatform = query.selectedPlatform
        ? game.parent_platforms.some((entry) => entry.platform.id === query.selectedPlatform)
        : true;
      return matchesSearch && matchesPlatform;
    });
  }

  const params = {
    search: query.searchText || undefined,
    genres: query.selectedGenre ? String(query.selectedGenre) : undefined,
    platforms: query.selectedPlatform ? String(query.selectedPlatform) : undefined,
    ordering: sortMapping[query.sortOrder],
    page_size: 20
  };

  try {
    const response = await apiClient.get<{ results: Game[] }>('/games', {
      params,
      signal
    });

    return response.data.results;
  } catch (error) {
    return fallbackGames.filter((game) => {
      const matchesSearch = query.searchText
        ? game.name.toLowerCase().includes(query.searchText.toLowerCase())
        : true;
      const matchesPlatform = query.selectedPlatform
        ? game.parent_platforms.some((entry) => entry.platform.id === query.selectedPlatform)
        : true;
      return matchesSearch && matchesPlatform;
    });
  }
}
