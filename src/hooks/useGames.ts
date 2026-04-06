import { useEffect, useState } from 'react';
import axios from 'axios';
import type { FilterState, Game } from '../types';
import { fetchGames } from '../services/game-service';

export function useGames(filters: FilterState) {
  const [data, setData] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const loadGames = async () => {
      setLoading(true);
      setError(null);

      try {
        const games = await fetchGames(filters, controller.signal);
        setData(games);
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }

        setError(err instanceof Error ? err.message : 'Failed to load games');
      } finally {
        setLoading(false);
      }
    };

    loadGames();
    return () => {
      controller.abort();
    };
  }, [filters]);

  return { data, loading, error };
}
