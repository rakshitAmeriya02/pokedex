import React, { useMemo } from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import MyPokemonTable from "src/components/MyPokemonTable";
import { withLayout } from "src/hoc/withLayout";
import { extractJSON } from "src/services";
import { APP_ROUTES, LOCAL_STORAGE } from "src/utils/enums";
import { CachedPokemons, SavedPokemon } from "src/utils/types";
import { ShouldRender } from "src/components/shared";

const MyPokemonList = () => {
  const navigate = useNavigate();
  const pokemons = useMemo(() => {
    const pokemonsCaught: CachedPokemons =
      extractJSON(LOCAL_STORAGE.CATCHED_POKEMONS) || {};
    const savedPokemons = Object.entries(pokemonsCaught).reduce(
      (arr, [name, props]) => {
        props.forEach(({ createdAt, id, nickName }) => {
          arr.push({
            createdAt,
            id,
            name,
            nickName,
          });
        });
        return arr;
      },
      [] as SavedPokemon[]
    );
    return savedPokemons;
  }, []);

  const handleFindPokemons = () => navigate(APP_ROUTES.HOME);

  return (
    <React.Fragment>
      <ShouldRender check={pokemons.length > 0}>
        <MyPokemonTable pokemons={pokemons} />
      </ShouldRender>
      <ShouldRender check={pokemons.length <= 0}>
        <div className="flex-fill d-flex flex-column align-items-center justify-content-center">
          <h4 className="mb-4">
            Seems like you havn't catched any Pokemons yet!
          </h4>
          <Button variant="dark" onClick={handleFindPokemons}>
            Find Pokemons
          </Button>
        </div>
      </ShouldRender>
    </React.Fragment>
  );
};

export default withLayout(MyPokemonList);
