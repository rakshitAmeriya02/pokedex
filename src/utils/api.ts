import { fetchedResultsSchema } from "src/App";
import { HOST_ROOT } from "./constants";
import { Pokemon } from "./types";

export const getPokemons = async (limit: number = 20, offset: number = 20) => {
  const endPoint = `pokemon/?limit=${limit}&offset=${offset}`;
  const result = await reusableCall(endPoint);
  return result as fetchedResultsSchema;
};

export const getPokemonDetail = async (id: string) => {
  const endPoint = `pokemon/${id}`;
  const result = await reusableCall(endPoint);
  return result as Pokemon;
};

const reusableCall = (endPoint: string) => {
  return new Promise((resolve, reject) => {
    fetch(HOST_ROOT + endPoint, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
