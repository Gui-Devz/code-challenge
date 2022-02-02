import { screen, render } from "@testing-library/react";
import Home from "../../pages/index";

describe("Home page", () => {
  it("should render correctly", () => {
    render(<Home />);

    expect(screen.getByText("Simular a compra")).toBeInTheDocument();
  });
});
