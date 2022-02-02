import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SimulateValuesProvider } from "../hooks/useSimulate";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SimulateValuesProvider>
      <Component {...pageProps} />
    </SimulateValuesProvider>
  );
}

export default MyApp;
