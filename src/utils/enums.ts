export enum APP_ROUTES {
  ROOT = "/",
  HOME = "/pokemons",
  POKEMON_DETAIL = "/pokemon/:id",
  MY_LIST = "/my-pokemon-list",
}

export enum LOCAL_STORAGE {
  CATCHED_POKEMONS = "pokedex-caught-pokemons",
}

export enum NOTIFICATION_TYPE {
  ERROR = "error",
  INFO = "info",
  SUCCESS = "success",
  WARN = "warn",
}
