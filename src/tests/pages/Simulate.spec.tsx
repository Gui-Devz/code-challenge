import { screen, render } from "@testing-library/react";
import Simulate from "../../pages/simulate";

const fakeBrand = {
  name: "fake-name",
  code: "fake-code",
  image: "http://fake-image",
};

const fakeSimulationData = {
  price: 240,
  installment: 10,
  brand_simulation: [
    {
      taxValue: 12,
      tax: 6.99,
    },
  ],
};

//Mocking the localStorage and Json.parse() function
jest.spyOn(window.localStorage.__proto__, "getItem");
window.localStorage.__proto__.getItem = () => fakeBrand;

JSON.parse = jest.fn().mockImplementationOnce(() => {
  return fakeBrand;
});

jest.mock("../../hooks/useSimulate", () => {
  return {
    useSimulatedValues: () => {
      return {
        simulationData: fakeSimulationData,
      };
    },
  };
});

describe("Simulate page", () => {
  it("should render correctly", () => {
    render(<Simulate />);

    expect(screen.getByText("Simular outra compra!")).toBeInTheDocument();
  });
});
