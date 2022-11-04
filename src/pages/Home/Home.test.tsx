import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { APP_ROUTES } from "src/utils/enums";
import Home from ".";

describe("renders Home page", () => {
  test("Home Page loading data", async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: APP_ROUTES.POKEMON_DETAIL }]}>
        <Home />
      </MemoryRouter>
    );

    const loaderText = screen.getByText(
      "Please wait while we're loading pokemon details"
    );
    expect(loaderText).toBeInTheDocument();

    await waitForElementToBeRemoved(loaderText);
  });
});
