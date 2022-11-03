import { capitalCase } from "capital-case";
import { Image, Spinner } from "react-bootstrap";
import { usePokemonDetail } from "src/hooks/usePokemonDetail";

const PokemonDetail = () => {
  const { handleCatchPokemon, loadingText, pokemonDetail } = usePokemonDetail();
  return (
    <div className="p-4 d-flex flex-column min-vh-100">
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
    </div>
  );
};

export default PokemonDetail;
