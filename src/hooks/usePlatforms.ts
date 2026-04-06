import { useMemo } from 'react';
import type { Platform } from '../types';

export function usePlatforms() {
  return useMemo<Platform[]>(
    () => [
      { id: 1, name: 'PC', slug: 'pc' },
      { id: 187, name: 'PlayStation', slug: 'playstation' },
      { id: 186, name: 'Xbox', slug: 'xbox' },
      { id: 3, name: 'iOS', slug: 'ios' },
      { id: 4, name: 'Android', slug: 'android' },
      { id: 5, name: 'Macintosh', slug: 'macintosh' },
      { id: 6, name: 'Linux', slug: 'linux' }
    ],
    []
  );
}
