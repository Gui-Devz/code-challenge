import Image from "next/image";
import { useRouter } from "next/router";
import imageURL from "../../public/images/phone.png";

import styles from "./product-simulated-card.module.scss";

type Brand = {
  name: string;
  code: string;
  image: string;
};

interface ProductSilmulatedCardProps {
  price: number;
  brand: Brand;
  installment: number;
  taxValue: number;
  tax: number;
}

export function ProductSimulatedCard({
  price,
  brand,
  installment,
  taxValue,
  tax,
}: ProductSilmulatedCardProps) {
  const router = useRouter();
  const finalPrice = price + taxValue;
  function redirectToHome() {
    router.push("/");
  }
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.image}>
          <Image width={380} height={214} src={imageURL} alt="" />
        </div>
        <div className={styles.data}>
          <div>
            <p>
              Bandeira Escolhida: <span>{brand.name}</span>
              <span>
                <Image width={30} height={30} src={brand?.image} alt="" />
              </span>
            </p>

            <p>
              Nº de parcelas:
              <span>{installment}x</span>
            </p>
            <p>
              Taxa da bandeira:
              <span>{tax}%</span>
            </p>
            <p>
              Valor da taxa:
              <span>
                {taxValue?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </p>
            <p>
              Valor:{" "}
              <span>
                {price
                  ? price?.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                  : ""}
              </span>
            </p>
            <p>
              Valor + taxas:{" "}
              <span>
                {price
                  ? finalPrice?.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                  : ""}
              </span>
            </p>
          </div>
        </div>
        <button
          data-testid="button"
          onClick={() => {
            redirectToHome();
          }}
        >
          Simular outra compra!
        </button>
      </div>
    </div>
  );
}
