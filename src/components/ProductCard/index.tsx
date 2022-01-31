import React, { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";

import styles from "./product-card.module.scss";

interface ProductCardProps {
  imageURL: StaticImageData;
  brands: string[];
  price: string;
}

export function ProductCard({ imageURL, brands, price }: ProductCardProps) {
  const [brand, setBrand] = useState<string>("Bandeiras");

  function setBrandState(event: ChangeEvent<HTMLSelectElement>) {
    setBrand(event.target.value);
  }
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image src={imageURL} alt="" />
      </div>
      <div className={styles.selectSection}>
        <div>
          <label htmlFor="brands">Escolha a sua bandeira do cartão</label>
          <select
            id="brands"
            value={brand}
            name="brands"
            onChange={(e) => {
              setBrandState(e);
            }}
          >
            {brands &&
              React.Children.toArray(
                brands.map((brand) => {
                  return (
                    <>
                      <option value={brand}>brand</option>
                    </>
                  );
                })
              )}
          </select>
        </div>
        <div className={styles.installments}>
          <label htmlFor="brands">Parcelar</label>
          <select
            id="brands"
            value={brand}
            name="brands"
            onChange={(e) => {
              setBrandState(e);
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
            Valor final:{" "}
            <span>
              {Number(price).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </p>
        </div>
      </div>
      <button onClick={() => {}}>Simular a compra</button>
    </div>
  );
}
