import { Button } from "@chakra-ui/react";
import styles from "./root.module.scss";
import Image from "next/image";
import { longway, revans } from "@/styles/font";
import { Form, Formik } from "formik";
import FormikControl from "@/components/forms/Formik/FormikControl";
import ListEvents from "@/components/listEvents/ListEvents";
import Link from "next/link";

export default function Home() {

  return (
    <section className={styles.pageContainer}>
      <div className={styles.hero}>
        <div>
          <h2 className={revans.className}>
            Host, Connect, <br /> Celebrate: Your Events,
            <br /> In Our Platform
          </h2>
          <p>
            Book and learn helpful tips from 3,168+ mentors in <br />{" "}
            world-class companies with our global community
          </p>
          <Button><Link href='#events'>Explore Now</Link></Button>
        </div>
        <div>
          <Image src="/assets/images/hero.png" alt="Hero image" objectFit="cotain" layout="fill" className={styles.heroImg}/>
      
        </div>
      </div>
      <div className={styles.eventList} id="events">
        <h2>Trusted by Thousands of Events</h2>
        <ListEvents/>
      </div>
    </section>
  );
}
