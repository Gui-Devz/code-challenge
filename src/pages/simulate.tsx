import axios from "axios";
import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ProductSimulatedCard } from "../components/ProductSimulatedCard";

import styles from "../styles/Simulate.module.scss";

type Brand = {
  name: string;
  code: string;
  image: string;
};

type SimulateBody = {
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

export default function Simulate() {
  const [simulateBody, setSimulateBody] = useState<SimulateBody>(() => {
    const storagedCart =
      typeof window !== "undefined"
        ? localStorage.getItem("@Simulate:data")
        : null;

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return undefined;
  });
  const [simulateData, setSimulateData] = useState<SimulateData>();
  const [brand, setBrand] = useState<Brand>(() => {
    const storagedCart =
      typeof window !== "undefined"
        ? localStorage.getItem("@Simulate:brand")
        : null;

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return {};
  });

  useEffect(() => {
    const data = axios
      .post("http://localhost:3000/api/simulate", simulateBody)
      .then((response) => {
        setSimulateData(response.data.data);
      })
      .catch((err) => {
        return err;
      });
  }, [simulateBody]);
  //console.log(simulateData);

  return (
    <>
      <Header />
      <main className={styles.productContainer}>
        {simulateBody && (
          <ProductSimulatedCard
            price={simulateBody.amount}
            brand={brand}
            installment={simulateData?.installment}
            tax={simulateData?.brand_simulation[0].tax}
            taxValue={simulateData?.brand_simulation[0].tax_amount}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
