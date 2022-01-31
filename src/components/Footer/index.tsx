import Image from "next/image";

import logoFooter from "../../public/images/logoFooter.png";

import styles from "./footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <Image src={logoFooter} alt="" />
      </div>
      <div>
        <p>
          Made by Guilherme with <span>&#10084;</span>
        </p>
      </div>
    </footer>
  );
}
