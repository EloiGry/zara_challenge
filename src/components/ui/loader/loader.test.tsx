import { render, screen } from "@testing-library/react";
import { Loader } from "./loader";

test("renders the loading spinner", () => {
  render(<Loader />);
  const spinner = screen.getByTestId("loading-spinner");
  expect(spinner).toBeInTheDocument();
});