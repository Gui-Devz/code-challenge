import { fireEvent, render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { useRouter } from "next/router";
import { ProductCard } from ".";

jest.mock("next/router");
jest.mock("../../hooks/useSimulate", () => {
  return {
    useSimulatedValues: () => {
      return {
        addProductToCart: () => {},
      };
    },
  };
});

describe("ProductCard component", () => {
  const fakeBrands = [
    {
      name: "fake-name",
      code: "fake-code",
      image: "http://fake-image",
    },
  ];

  it("should render correctly, showing the options in select element", () => {
    render(
      <ProductCard imageURL={"/fake-url"} brands={fakeBrands} price={240} />
    );

    expect(screen.getByTestId("select")).toHaveDisplayValue("fake-name");
  });

  it("should redirect user if chosen to simulate a purchase", () => {
    const pushMock = jest.fn();
    const useRouterMocked = mocked(useRouter);

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(
      <ProductCard imageURL={"/fake-url"} brands={fakeBrands} price={240} />
    );
    const button = screen.getByTestId("button");

    fireEvent.click(button);
    expect(pushMock).toHaveBeenCalled();
  });
});
