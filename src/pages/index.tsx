import type { NextPage } from "next";
import Head from "next/head";
import axios from "axios";

import imgFirstCard from "../public/images/phone.png";

import { Header } from "../components/Header";
import { ProductCard } from "../components/ProductCard";

import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";

import styles from "../styles/Home.module.scss";

type Brand = {
  name: string;
  code: string;
  image: string;
};
const Home: NextPage = () => {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const data = async () => {
      const response = await axios.get("http://localhost:3000/api/brands");

      setBrands(response.data.data);
    };
    data();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <Head>
          <title>Brasil Cash</title>
          <meta name="description" content="Created by Guilherme" />
        </Head>

        <main className={styles.main}>
          <div className={styles.productsList}>
            <ProductCard imageURL={imgFirstCard} brands={brands} price={240} />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Home;
