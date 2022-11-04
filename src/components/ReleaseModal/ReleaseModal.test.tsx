import { fireEvent, render, screen } from "@testing-library/react";
import { IMAGES } from "src/utils/constants";
import { SavedPokemon } from "src/utils/types";

import PokemonReleaseModal from ".";

describe("render Pokemon Release Modal", () => {
  test("default view with image load success", async () => {
    const pokemon: SavedPokemon = {
      id: 2,
      createdAt: new Date(),
      name: "Ivysaur",
      nickName: "Eve",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
    };
    render(
      <PokemonReleaseModal
        show={true}
        pokemon={pokemon}
        confirmationHandler={jest.fn}
      />
    );
    const text = screen.getByText(/Are you sure you want to release/i);
    expect(text).toBeInTheDocument();

    const buttons = await screen.findAllByRole("button");
    const btnsText = buttons.map((btn) => btn.textContent);
    expect(btnsText).toEqual(["Confirm", "Cancel"]);

    const image: HTMLImageElement = screen.getByRole("img", {
      name: pokemon.nickName,
    });

    expect(image.src).toBe(pokemon.image);
    expect(image).toHaveClass("mw-100");
  });

  test("default view with image load error", async () => {
    const pokemon: SavedPokemon = {
      id: 2,
      createdAt: new Date(),
      name: "Ivysaur",
      nickName: "Eve",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/error.png",
    };
    render(
      <PokemonReleaseModal
        show={true}
        pokemon={pokemon}
        confirmationHandler={jest.fn}
      />
    );

    const image: HTMLImageElement = screen.getByRole("img", {
      name: pokemon.nickName,
    });
    fireEvent.error(image);
    expect(image.src).toBe(`http://localhost/${IMAGES.missingPokemon}`);
  });
});
