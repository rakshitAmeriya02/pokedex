import { capitalCase } from "capital-case";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { extractJSON, saveJSON } from "src/services";
import { createNotification } from "src/services/notfications";
import { getPokemonDetail } from "src/utils/api";
import { POKEMON_CATCH_SUCCESS_THRESHOLD } from "src/utils/constants";
import { LOCAL_STORAGE, NOTIFICATION_TYPE } from "src/utils/enums";
import { CatchedPokemon, Pokemon } from "src/utils/types";

export const usePokemonDetail = () => {
  const [loadingText, setLoadingText] = useState<string | null>(null);
  const [pokemonDetail, setPokemonDetail] = useState<Pokemon | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPokemonDetail = async (id: string) => {
      setLoadingText("Please wait while we're loading pokemon details");
      try {
        const result = await getPokemonDetail(id);
        setPokemonDetail(result);
      } catch (error) {
        createNotification(
          NOTIFICATION_TYPE.ERROR,
          (error as Error).message ?? "Something went wrong"
        );
      } finally {
        setLoadingText(null);
      }
    };
    if (id) {
      fetchPokemonDetail(id);
    }
  }, [id]);

  const attempToCatchPokemon = () => {
    const value = Math.random();
    if (value > POKEMON_CATCH_SUCCESS_THRESHOLD) {
      const catchedPokemons: CatchedPokemon =
        extractJSON(LOCAL_STORAGE.CATCHED_POKEMONS) || {};
      const name = pokemonDetail?.name!;
      const currentCount = catchedPokemons[name] || 0;
      catchedPokemons[name] = currentCount + 1;
      saveJSON(LOCAL_STORAGE.CATCHED_POKEMONS, catchedPokemons);
      return true;
    } else {
      return false;
    }
  };

  const catchPokemon = () => {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        const success = attempToCatchPokemon();
        if (success) resolve(success);
        else reject();
      }, 1500)
    );
  };

  const handleCatchPokemon = async () => {
    setLoadingText("Attempting to catch the pokemon");
    try {
      await catchPokemon();
      createNotification(
        NOTIFICATION_TYPE.SUCCESS,
        `Caught ${capitalCase(pokemonDetail?.name!)} successfully!`
      );
    } catch (error) {
      createNotification(NOTIFICATION_TYPE.ERROR, "Oops almost got him!");
    } finally {
      setLoadingText(null);
    }
  };

  return {
    handleCatchPokemon,
    loadingText,
    pokemonDetail,
  };
};
