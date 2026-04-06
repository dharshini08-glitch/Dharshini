export interface FilterState {
  searchText: string;
  selectedGenre: number | null;
  selectedPlatform: number | null;
  sortOrder: string;
}

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Game {
  id: number;
  name: string;
  rating: number;
  released: string | null;
  background_image: string | null;
  parent_platforms: Array<{ platform: Platform }>;
}
