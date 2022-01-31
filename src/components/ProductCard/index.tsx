import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Image from "next/image";

import styles from "./product-card.module.scss";
import { useRouter } from "next/router";

interface Brand {
  name: string;
  code: string;
  image: string;
}

interface ProductCardProps {
  imageURL: StaticImageData;
  brands: Brand[];
  price: number;
}

export function ProductCard({ imageURL, brands, price }: ProductCardProps) {
  const [brand, setBrand] = useState<string>("others");
  const [brandObj, setBrandObj] = useState<Brand>();
  const [installment, setInstallment] = useState<number>(1);

  const router = useRouter();

  function saveProductInMemory() {
    localStorage?.setItem(
      "@Simulate:data",
      JSON.stringify({ installment, brands: [brand], amount: price })
    );
    localStorage?.setItem("@Simulate:brand", JSON.stringify({ ...brandObj }));

    router.push("/simulate");
  }

  function settingBrandAndBrandOj(value: string) {
    const brandObj = brands.filter((x) => value === x.code);
    console.log(brandObj);

    setBrand(value);
    setBrandObj(brandObj[0]);
  }
  //This side-effect guarantees that brandObj will be populated without
  //depending the select option value
  useEffect(() => {
    const firstObjectBrand = brands?.filter((x) => x.code === "others");

    setBrandObj(firstObjectBrand[0]);
  }, [brands]);

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image priority src={imageURL} alt="" />
      </div>
      <div className={styles.selectSection}>
        <div>
          <label htmlFor="brands">Escolha a sua bandeira do cartão</label>
          <select
            id="brands"
            value={brand}
            name="brands"
            onChange={(e) => {
              settingBrandAndBrandOj(e.target.value);
            }}
          >
            {brands &&
              brands.map((brand) => {
                return (
                  <React.Fragment key={brand.code}>
                    <option value={brand.code}>{brand.name}</option>
                  </React.Fragment>
                );
              })}
          </select>
        </div>
        <div className={styles.installments}>
          <label htmlFor="installment">Parcelar em:</label>
          <select
            id="installment"
            value={installment}
            name="installment"
            onChange={(e) => {
              setInstallment(Number(e.target.value));
            }}
          >
            {React.Children.toArray(
              Array.from({ length: 12 }).map((x, index) => {
                return (
                  <>
                    <option value={index + 1}>{`${index + 1}x`}</option>
                  </>
                );
              })
            )}
          </select>
          <p>
            Valor:{" "}
            <span>
              {Number(price).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </p>
        </div>
      </div>
      <button
        onClick={() => {
          saveProductInMemory();
        }}
      >
        Simular a compra
      </button>
    </div>
  );
}
