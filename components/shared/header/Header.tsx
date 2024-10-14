"use client"

import React, { useRef } from "react";
import styles from "./header.module.scss";
import Image from "next/image";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button, useDisclosure } from "@chakra-ui/react";
import MobileNav from "./MobileNav";
import NaveItems from "./NaveItems";
import { longway } from "@/styles/font";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <header className={styles.header}>
      <div className={styles.head}>
        <Link href="/">
          <Image
            src="/assets/images/logo.svg"
            width={40}
            height={35}
            alt="PlanIt logo"
          />
        </Link>
        <h2 className={longway.className}>Plan It</h2>
      </div>
      <NaveItems />
      <div className={styles.auth}>
        <SignedIn>
          <div className={styles.signedIn}>
          <UserButton />
          <span>
          <Button ref={btnRef} onClick={onOpen} size='sm' variant='ghost'>
            
          <Image
            src="/assets/icons/menu.svg"
            width={24}
            height={24}
            alt="PlanIt logo"
          />
          </Button>
          </span>
          <MobileNav onClose={onClose} ref={btnRef}  isOpen={isOpen} />
          </div>
        </SignedIn>
        <SignedOut>
          <Link href='/sign-in'>
          <Button className={styles.button}>Login</Button>
          </Link>
        </SignedOut>
      </div>
    </header>
  );
}
