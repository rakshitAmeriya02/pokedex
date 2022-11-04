import { rest } from "msw";
import { HOST_ROOT } from "src/utils/constants";
import pokemons from "./__mockData/pokemons.json";

export const handlers = [
  // Handles a GET request
  rest.get(`${HOST_ROOT}pokemon`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: pokemons,
      })
    );
  }),
];
