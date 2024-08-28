"use client";
import React from "react";
import styles from "./header.module.scss";
import Link from "next/link";
import { headerLinks } from "@/constants";
import { usePathname } from "next/navigation";
export default function NaveItems() {
  const pathname = usePathname();
  return (
    <ul className={styles.navItemsContainer}>
      {headerLinks.map((link) => (
        <li
          key={link.label}
          className={`${pathname == link.route ? styles.activeNavItems : ""}`}
        >
          <Link href={link.route}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
}
