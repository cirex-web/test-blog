import Image from "next/image";
import styles from "./page.module.css";
import { BrowsingHistory } from "./components/BrowsingHistory";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <h2 style={{ fontSize: "50px" }}>Hi!</h2>
        <h1>I&apos;m Eric Xu</h1>
        <h2>CMU SCS '27</h2>
      </div>
      <BrowsingHistory />
    </main>
  );
}
