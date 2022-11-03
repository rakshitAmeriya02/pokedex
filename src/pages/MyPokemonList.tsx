import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import MyPokemonTable from "src/components/MyPokemonTable";
import { withLayout } from "src/hoc/withLayout";
import { APP_ROUTES, NOTIFICATION_TYPE } from "src/utils/enums";
import { ShouldRender } from "src/components/shared";
import {
  MyPokemonListContext,
  MyPokemonListProvider,
} from "src/context/MyPokemonListContext";
import ReleaseModal from "src/components/ReleaseModal";
import { createNotification } from "src/services/notfications";
import { capitalCase } from "capital-case";

const MyPokemonList = () => {
  const navigate = useNavigate();
  const { pokemons, releasePokemon } = useContext(MyPokemonListContext);
  const initialValue = {
    open: false,
    index: -1,
  };
  const [showConfirmation, setShowConfirmation] = useState({ ...initialValue });

  const handleFindPokemons = () => navigate(APP_ROUTES.HOME);

  const handleReleasePokemon = (index: number) => {
    setShowConfirmation({
      open: true,
      index,
    });
  };

  const handleConfirmation = (confirmation: boolean) => {
    if (confirmation) {
      releasePokemon(showConfirmation.index);
      const pokemon = pokemons[showConfirmation.index];
      createNotification(
        NOTIFICATION_TYPE.SUCCESS,
        `Released ${capitalCase(pokemon.name)} successfully!`
      );
    }
    setShowConfirmation({ ...initialValue });
  };

  return (
    <React.Fragment>
      <ShouldRender check={pokemons.length > 0}>
        <MyPokemonTable
          pokemons={pokemons}
          releasePokemon={handleReleasePokemon}
        />
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
      <ReleaseModal
        confirmationHandler={handleConfirmation}
        pokemon={pokemons[showConfirmation.index]}
        show={showConfirmation.open}
      />
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
