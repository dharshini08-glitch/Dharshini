import { useMemo } from 'react';
import type { Genre } from '../types';

export function useGenres() {
  return useMemo<Genre[]>(
    () => [
      { id: 4, name: 'Action' },
      { id: 51, name: 'Indie' },
      { id: 3, name: 'Adventure' },
      { id: 5, name: 'RPG' },
      { id: 10, name: 'Strategy' },
      { id: 2, name: 'Shooter' },
      { id: 40, name: 'Casual' },
      { id: 14, name: 'Simulation' },
      { id: 7, name: 'Puzzle' },
      { id: 11, name: 'Arcade' },
      { id: 83, name: 'Platformer' },
      { id: 1, name: 'Racing' },
      { id: 59, name: 'Massively Multiplayer' },
      { id: 15, name: 'Sports' },
      { id: 6, name: 'Fighting' }
    ],
    []
  );
}
