import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Product = {
  amount: number;
  brands: string[];
  installment: number;
};

type BrandSimulation = {
  brand: string;
  tax: number;
  tax_amount: number;
};

type SimulateData = {
  amount: number;
  brands: string[];
  installment: number;
  brand_simulation: BrandSimulation[];
};

type SimulateValuesContextData = {
  addProductToCart: (product: Product) => void;
  simulationData: SimulateData;
};

interface SimulateValuesProviderProps {
  children: ReactNode;
}

const SimulateValuesContext = createContext<SimulateValuesContextData>(
  {} as SimulateValuesContextData
);

export function SimulateValuesProvider({
  children,
}: SimulateValuesProviderProps) {
  const [product, setProduct] = useState<Product>(() => {
    //this guarantees product will be the same even after user reloads page
    const storagedCart =
      typeof window !== "undefined"
        ? localStorage.getItem("@Simulate:data")
        : null;

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return {};
  });
  const [simulationData, setSimulationData] = useState<SimulateData>();

  function addProductToCart(product: Product) {
    setProduct(product);
  }

  async function fetchSimulationData() {
    const response = await axios.post(
      "http://localhost:3000/api/simulate",
      product
    );

    setSimulationData(response.data.data);
  }

  useEffect(() => {
    fetchSimulationData();
  }, [product]);
  return (
    <SimulateValuesContext.Provider
      value={{
        addProductToCart,
        simulationData,
      }}
    >
      {children}
    </SimulateValuesContext.Provider>
  );
}

export function useSimulatedValues(): SimulateValuesContextData {
  const context = useContext(SimulateValuesContext);

  return context;
}
