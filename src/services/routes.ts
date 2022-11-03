import { APP_ROUTES } from "src/utils/enums";

export const getRoute = (key: APP_ROUTES, param: string) => {
  switch (key) {
    case APP_ROUTES.POKEMON_DETAIL:
      return APP_ROUTES.POKEMON_DETAIL.replace(":id", param);
    default:
      return key;
  }
};
