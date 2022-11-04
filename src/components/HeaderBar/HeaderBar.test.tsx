import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { APP_ROUTES } from "src/utils/enums";

import HeaderBar from ".";

describe("render header bar", () => {
  test("renders My Pokemon List text on button on Home Page", () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: APP_ROUTES.HOME }]}>
        <HeaderBar />
      </MemoryRouter>
    );
    const btn = screen.getByRole("button");
    expect(btn).toHaveTextContent("My Pokemon List");
  });

  test("renders Home text on button on Pokemon Detail Page", () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: APP_ROUTES.POKEMON_DETAIL }]}>
        <HeaderBar />
      </MemoryRouter>
    );
    const btn = screen.getByRole("button");
    expect(btn).toHaveTextContent("Home");
  });

  test("renders Home text on button on My Pokemon List Page", () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: APP_ROUTES.MY_LIST }]}>
        <HeaderBar />
      </MemoryRouter>
    );
    const btn = screen.getByRole("button");
    expect(btn).toHaveTextContent("Home");
  });
});
