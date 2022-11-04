import React from "react";
import { capitalCase } from "capital-case";
import PokemonModal from "src/components/PokemonModal";
import { withLayout } from "src/hoc/withLayout";
import { usePokemonDetail } from "src/hooks/usePokemonDetail";
import { extractJSON, saveJSON } from "src/services";
import { LOCAL_STORAGE, NOTIFICATION_TYPE } from "src/utils/enums";
import { CachedPokemons } from "src/utils/types";
import { createNotification } from "src/services/notfications";
import { LazyImage, Loader, ShouldRender } from "src/components/shared";
import { IMAGES } from "src/utils/constants";

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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const imageElement = e.target as HTMLImageElement;
    imageElement.src = IMAGES.missingPokemon;
  };

  return (
    <React.Fragment>
      <Loader loaderText={loadingText || ""} loading={Boolean(loadingText)} />
      {Boolean(pokemonDetail) && (
        <div className="w-100 d-flex flex-column align-items-center justify-content-center">
          <h2>{capitalCase(pokemonDetail!.name)}</h2>
          <LazyImage
            className="mw-100"
            onError={handleImageError}
            placeholderImage={IMAGES.pokemonPlaceholder}
            src={pokemonDetail!.sprites.other["official-artwork"].front_default}
            alt={pokemonDetail!.name}
          />
          <button
            onClick={handleCatchPokemon}
            type="button"
            className="btn btn-dark pointer mb-4"
          >
            Catch {capitalCase(pokemonDetail!.name)}
          </button>
          <ShouldRender check={pokemonDetail!.types.length > 0}>
            <div className="mb-4">
              <h6>Type</h6>
              {pokemonDetail!.types.map((item: any) => (
                <span
                  key={item.slot}
                  className="bg-info d-inline-block px-2 py-2 m-2 rounded"
                >
                  {capitalCase(item.type.name)}
                </span>
              ))}
            </div>
          </ShouldRender>
          <ShouldRender check={pokemonDetail!.moves.length > 0}>
            <div className="mb-4">
              <h6>Moves</h6>
              {pokemonDetail!.moves.map((item: any, index: number) => (
                <span
                  key={index}
                  className="bg-info d-inline-block px-2 py-2 m-2 rounded"
                >
                  {capitalCase(item.move.name)}
                </span>
              ))}
            </div>
          </ShouldRender>
          <ShouldRender check={pokemonDetail!.held_items.length > 0}>
            <div className="mb-4">
              <h6>Held Itmes</h6>
              {pokemonDetail!.held_items.map((item: any, index: number) => (
                <span
                  key={index}
                  className="bg-info d-inline-block px-2 py-2 m-2 rounded"
                >
                  {capitalCase(item.item.name)}
                </span>
              ))}
            </div>
          </ShouldRender>
        </div>
      )}
      <PokemonModal show={showModal} onHide={savePokemonToMyList} />
    </React.Fragment>
  );
};

export default withLayout(PokemonDetail);
