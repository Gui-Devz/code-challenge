import axios from "axios";
import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ProductSimulatedCard } from "../components/ProductSimulatedCard";
import { useSimulatedValues } from "../hooks/useSimulate";

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
  //captures the brand obj containing name and image from localStorage
  const [brand, setBrand] = useState<Brand>(() => {
    const storagedBrand =
      typeof window !== "undefined"
        ? localStorage.getItem("@Simulate:brand")
        : null;

    if (storagedBrand) {
      return JSON.parse(storagedBrand);
    }

    return {};
  });
  const { simulationData } = useSimulatedValues();

  return (
    <>
      <Header />
      <main className={styles.productContainer}>
        {simulationData && (
          <ProductSimulatedCard
            price={simulationData.amount}
            brand={brand}
            installment={simulationData?.installment}
            tax={simulationData?.brand_simulation[0].tax}
            taxValue={simulationData?.brand_simulation[0].tax_amount}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
