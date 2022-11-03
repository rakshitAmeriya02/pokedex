import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders pokedex text", () => {
  render(<App />);
  const element = screen.getByText(/pokedex/i);
  expect(element).toBeInTheDocument();
});
