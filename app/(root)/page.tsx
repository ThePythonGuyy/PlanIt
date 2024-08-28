import { Button } from "@chakra-ui/react";
import styles from "./root.module.scss";
import Image from "next/image";

export default function Home() {
  return (
    <section className={styles.pageContainer}>
      <div className={styles.hero}>
        <div>
          <h2>
            Host, Connect, <br /> Celebrate: Your Events,
            <br /> In Our Platform
          </h2>
          <p>
            Book and learn helpful tips from 3,168+ mentors in <br />{" "}
            world-class companies with our global community
          </p>
          <Button>Explore Now</Button>
        </div>
        <div>
          <Image src="/assets/images/hero.png" alt="Hero image" objectFit="cotain" layout="fill" className={styles.heroImg}/>
      
        </div>
      </div>
    </section>
  );
}
