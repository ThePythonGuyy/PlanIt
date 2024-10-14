"use client";

import { Button, Spinner, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import styles from "./eventButton.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fetchUserId } from "@/lib/actions/authServer.actions";
import { IEvent } from "@/lib/database/models/event.model";

type EventButtonProps = {
  userId: string | undefined;
  event: IEvent;
};

export default function EventButton({ userId, event }: EventButtonProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
  const toast = useToast();
  const router = useRouter();
//   const BuyTicket = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (!userId) {
//       toast({
//         title: "Sign In",
//         description: "Please sign in to continue",
//         status: "info",
//         duration: 4000,
//         isClosable: true,
//       });
//       router.push("/sign-in");
//     }
//   };

  const SaveEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!userId) {
      toast({
        title: "Sign In",
        description: "Please sign in to continue",
        status: "info",
        duration: 4000,
        isClosable: true,
      });
      router.push("/sign-in");
    }
  };

  const onCheckout = async () => {
    setIsLoading(true);

    if (!userId) {
      toast({
        title: "Sign In",
        description: "Please sign in to continue",
        status: "info",
        duration: 4000,
        isClosable: true,
      });
      router.push("/sign-in");
    } else {
      const res = await fetch("/api/razorpay/createOrder", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: event?.price ? Number(event.price) : 0 ,
          userId,
          eventId: event._id,
        }),
      });

      const data = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string, // Public Razorpay Key
        amount: data.amount,
        currency: "INR",
        name: "Plan It",
        description: "Test Transaction",
        order_id: data.id,
        handler: function (response: any) {
          alert(
            `Payment Successful! Razorpay Payment ID: ${response.razorpay_payment_id}`
          );
        },
        prefill: {
          name: `Rahul`,
          email: "prorahul555@gmail.com",
          contact: "9999999999",
        },
        theme: {
          color: "#624bf5dd",
        },
      };
      setIsLoading(false)
      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    }
  };

  if(isLoading) {

    return (
        <div className={styles.loading}>
<Spinner size='xl' />
        </div>
    )
  }

  return (
    <>
      <form action={onCheckout} method="post">
        <Button className={styles.starBtn} onClick={SaveEvent}>
          {" "}
          <Image
            src="/assets/icons/star.svg"
            alt="calendar"
            width={20}
            height={20}
          />
          Save
        </Button>
        <Button className={styles.buyBtn} type="submit">
          {event?.price ? "Buy Ticket" : "Get Ticket"}
        </Button>
      </form>
    </>
  );
}
