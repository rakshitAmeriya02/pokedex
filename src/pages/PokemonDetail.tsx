import React from "react";
import { Image, Spinner } from "react-bootstrap";
import { capitalCase } from "capital-case";
import PokemonModal from "src/components/PokemonModal";
import { withLayout } from "src/hoc/withLayout";
import { usePokemonDetail } from "src/hooks/usePokemonDetail";
import { extractJSON, saveJSON } from "src/services";
import { LOCAL_STORAGE, NOTIFICATION_TYPE } from "src/utils/enums";
import { CachedPokemons } from "src/utils/types";
import { createNotification } from "src/services/notfications";

const PokemonDetail = () => {
  const {
    handleCatchPokemon,
    loadingText,
    pokemonDetail,
    showModal,
    setShowModal,
  } = usePokemonDetail();

  const savePokemonToMyList = (nickName: string) => {
    const pokemonsCaught: CachedPokemons =
      extractJSON(LOCAL_STORAGE.CATCHED_POKEMONS) || {};
    const { id, name } = pokemonDetail!;
    const nickNames = pokemonsCaught[name] || [];
    nickNames.push({
      id,
      nickName,
      createdAt: new Date(),
    });
    pokemonsCaught[name] = nickNames;
    saveJSON(LOCAL_STORAGE.CATCHED_POKEMONS, pokemonsCaught);
    createNotification(NOTIFICATION_TYPE.SUCCESS, "Saved to Pokemon List!");
    setShowModal(false);
  };

  return (
    <React.Fragment>
      {loadingText ? (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white opacity-50">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <Spinner animation="grow" />
            <h5 className="mt-4">{loadingText}</h5>
          </div>
        </div>
      ) : null}
      {pokemonDetail ? (
        <div className="w-100 d-flex flex-column align-items-center justify-content-center">
          <h2>{capitalCase(pokemonDetail.name)}</h2>
          <Image
            src={pokemonDetail.sprites.other["official-artwork"].front_default}
            alt={pokemonDetail.name}
          />
          <button
            onClick={handleCatchPokemon}
            type="button"
            className="btn btn-dark pointer mb-4"
          >
            Catch {capitalCase(pokemonDetail.name)}
          </button>
          <div className="mb-4">
            <h6>Type</h6>
            {pokemonDetail.types.map((item: any) => (
              <span
                key={item.slot}
                className="bg-info d-inline-block px-2 py-2 m-2 rounded"
              >
                {capitalCase(item.type.name)}
              </span>
            ))}
          </div>
          <div className="mb-4">
            <h6>Moves</h6>
            {pokemonDetail.moves.map((item: any, index: number) => (
              <span
                key={index}
                className="bg-info d-inline-block px-2 py-2 m-2 rounded"
              >
                {capitalCase(item.move.name)}
              </span>
            ))}
          </div>
          {pokemonDetail.held_items.length ? (
            <div className="mb-4">
              <h6>Held Itmes</h6>
              {pokemonDetail.held_items.map((item: any, index: number) => (
                <span
                  key={index}
                  className="bg-info d-inline-block px-2 py-2 m-2 rounded"
                >
                  {capitalCase(item.item.name)}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
      <PokemonModal show={showModal} onHide={savePokemonToMyList} />
    </React.Fragment>
  );
};

export default withLayout(PokemonDetail);
