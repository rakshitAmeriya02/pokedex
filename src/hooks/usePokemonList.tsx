import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { extractJSON } from "src/services";
import { createNotification } from "src/services/notfications";
import { getPokemons } from "src/utils/api";
import { LOCAL_STORAGE, NOTIFICATION_TYPE } from "src/utils/enums";
import { CatchedPokemon } from "src/utils/types";

export interface PokemonInfo {
  name: string;
  url: string;
  ownedTotal?: number;
}

export interface fetchedResultsSchema {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonInfo[];
}

export const usePokemonList = () => {
  const initialValue: fetchedResultsSchema = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };
  const [fetchedResults, setFetchedResults] = useState(initialValue);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  const selectedPage = useMemo(() => {
    const page = searchParams.get("page");
    return parseInt(page || "1");
  }, [searchParams]);

  const limit = useMemo(() => {
    return parseInt(searchParams.get("limit") || "20");
  }, [searchParams]);

  const offset = useMemo(
    () => (selectedPage - 1) * limit,
    [selectedPage, limit]
  );

  const pageLength = useMemo(() => {
    return Math.ceil(fetchedResults.count / limit);
  }, [fetchedResults.count, limit]);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const catchedPokemons: CatchedPokemon =
          extractJSON(LOCAL_STORAGE.CATCHED_POKEMONS) || {};
        const result = await getPokemons(limit, offset);
        result.results = result.results.map((item) => ({
          ...item,
          ownedTotal: catchedPokemons[item.name],
        }));
        setFetchedResults(result);
      } catch (error) {
        createNotification(
          NOTIFICATION_TYPE.ERROR,
          (error as Error).message ?? "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, [limit, offset]);

  return {
    limit,
    loading,
    offset,
    pageLength,
    results: fetchedResults,
    selectedPage,
  };
};
