import { screen, render, fireEvent } from "@testing-library/react";
import { mocked } from "jest-mock";
import { useRouter } from "next/router";
import { ProductSimulatedCard } from ".";

jest.mock("next/router");

describe("ProductSimulatedCard component", () => {
  const fakeProps = {
    price: 240,
    brand: {
      name: "fake-name",
      code: "fake-code",
      image: "http://fake-image",
    },
    installment: 10,
    taxValue: 12,
    tax: 6.99,
  };
  it("should render correctly", () => {
    render(<ProductSimulatedCard {...fakeProps} />);
    expect(screen.getByText("R$ 252,00")).toBeInTheDocument();
  });

  it("should redirect user if chosen to simulate another purchase", () => {
    const pushMock = jest.fn();
    const useRouterMocked = mocked(useRouter);

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<ProductSimulatedCard {...fakeProps} />);

    const button = screen.getByTestId("button");

    fireEvent.click(button);
    expect(pushMock).toHaveBeenCalled();
  });
});
