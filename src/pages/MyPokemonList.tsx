import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import MyPokemonTable from "src/components/MyPokemonTable";
import { withLayout } from "src/hoc/withLayout";
import { APP_ROUTES } from "src/utils/enums";
import { ShouldRender } from "src/components/shared";
import {
  MyPokemonListContext,
  MyPokemonListProvider,
} from "src/context/MyPokemonListContext";

const MyPokemonList = () => {
  const navigate = useNavigate();
  const { pokemons, releasePokemon } = useContext(MyPokemonListContext);

  const handleFindPokemons = () => navigate(APP_ROUTES.HOME);

  return (
    <React.Fragment>
      <ShouldRender check={pokemons.length > 0}>
        <MyPokemonTable pokemons={pokemons} releasePokemon={releasePokemon} />
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

const MyPokemonListWarpper = () => {
  return (
    <MyPokemonListProvider>
      <MyPokemonList />
    </MyPokemonListProvider>
  );
};

export default withLayout(MyPokemonListWarpper);
