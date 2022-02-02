import { render, screen } from "@testing-library/react";
import { Header } from ".";

describe("Header component", () => {
  it("should render correctly", () => {
    render(<Header />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Meu carrinho")).toBeInTheDocument();
  });
});
