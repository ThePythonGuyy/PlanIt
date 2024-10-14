import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from './footer.module.scss'
import { longway } from "@/styles/font";

export default function Footer() {
  return (
    <footer style={{width: '100%'}}>
      <div className={styles.footerCont}>
      <div className={`${styles.head} ${longway.className}`}>
        <Link href="/">
          <Image
            src="/assets/images/logo.svg"
            width={40}
            height={35}
            alt="PlanIt logo"
          />
        </Link>
        <h2 >Plan It</h2>
      </div>
        <p>© 2024 Plant It. All Rights reserved.</p>
      </div>
    </footer>
  );
}
