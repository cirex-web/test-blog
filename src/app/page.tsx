import Image from "next/image";
import styles from "./page.module.css";
import { BrowsingHistory } from "./components/BrowsingHistory";
import ericPic from "../../public/pic copy.png";
export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <h2 style={{ fontSize: "50px" }}>Hi!</h2>
        <h1>I&apos;m Eric Xu</h1>
        <h2>CMU SCS &apos;27</h2>
        {/* <div className={styles.titlePicContainer}> */}
        <Image src={ericPic} alt="" className={styles.titlePic} />
        {/* </div> */}
      </div>
      <BrowsingHistory />
    </main>
  );
}
