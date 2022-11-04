import { fireEvent, render, screen } from "@testing-library/react";

import PokemonModal from ".";

test("render Pokemon Modal", () => {
  render(<PokemonModal show={true} onHide={jest.fn} />);
  const textElement = screen.getByText(/Give Nickname/i);
  expect(textElement).toBeInTheDocument();

  const btn = screen.getByRole("button");
  expect(btn).toHaveTextContent(/Save/i);

  const input: HTMLInputElement = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();

  fireEvent.change(input, { target: { value: "Tim Lee" } });
  expect(input.value).toBe("Tim Lee");
});
