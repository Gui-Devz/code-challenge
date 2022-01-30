import Image from "next/image";
import Link from "next/link";
import logoImg from "../../public/images/logo.png";

import styles from "./header.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src={logoImg} alt="" />
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="cart">
              <a>Meu carrinho</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
