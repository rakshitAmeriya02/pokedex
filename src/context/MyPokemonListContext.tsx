import React, { useState } from "react";
import { cloneJSON, extractJSON, removeItem, saveJSON } from "src/services";
import { LOCAL_STORAGE } from "src/utils/enums";
import { CachedPokemons, SavedPokemon } from "src/utils/types";

const getIninitalValue = () => {
  const pokemonsCaught: CachedPokemons =
    extractJSON(LOCAL_STORAGE.CATCHED_POKEMONS) || {};
  const savedPokemons = Object.entries(pokemonsCaught).reduce(
    (arr, [name, props]) => {
      props.forEach(({ createdAt, id, nickName, image }) => {
        arr.push({
          createdAt,
          id,
          name,
          nickName,
          image,
        });
      });
      return arr;
    },
    [] as SavedPokemon[]
  );
  return savedPokemons;
};

export const MyPokemonListContext = React.createContext({
  pokemons: getIninitalValue(),
  releasePokemon: (index: number) => {},
});

interface Props {
  children?: React.ReactNode;
}

export const MyPokemonListProvider: React.FC<Props> = ({ children }) => {
  const [pokemons, setPokemons] = useState<SavedPokemon[]>(() => {
    const initialValue = getIninitalValue();
    return cloneJSON(JSON.stringify(initialValue));
  });

  const releasePokemon = (index: number) => {
    const pokemon = pokemons[index];
    const updatedPokemons = [...pokemons].filter((_, i) => i !== index);
    setPokemons(updatedPokemons);
    // update local storage cache
    const pokemonsCaught: CachedPokemons =
      extractJSON(LOCAL_STORAGE.CATCHED_POKEMONS) || {};
    const matchingPokemonIndex = pokemonsCaught[pokemon.name].findIndex(
      (item) => item.nickName === pokemon.nickName
    );
    if (matchingPokemonIndex !== -1) {
      pokemonsCaught[pokemon.name] = pokemonsCaught[pokemon.name].filter(
        (_, index) => index !== matchingPokemonIndex
      );
      const totalKeys = Object.keys(pokemonsCaught).length;
      if (totalKeys) {
        saveJSON(LOCAL_STORAGE.CATCHED_POKEMONS, pokemonsCaught);
      } else {
        removeItem(LOCAL_STORAGE.CATCHED_POKEMONS);
      }
    }
  };

  return (
    <MyPokemonListContext.Provider value={{ pokemons, releasePokemon }}>
      {children}
    </MyPokemonListContext.Provider>
  );
};
