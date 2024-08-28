import React from 'react'
import styles from "./header.module.scss";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'
import Link from 'next/link';
import Image from 'next/image';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    ref: React.RefObject<HTMLButtonElement>;
}
export default function MobileNav({isOpen, onClose, ref} : Props ) {
  return (
    <div>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={ref}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader><div className={styles.head}>
        <Link href="/">
          <Image
            src="/assets/images/logo.svg"
            width={40}
            height={35}
            alt="PlanIt logo"
          />
        </Link>
        <h2 >Plan It</h2>
      </div></DrawerHeader>

          <DrawerBody>
     
          </DrawerBody>

          <DrawerFooter>
                  
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
