"use client"

import React, { useEffect, useState } from "react";
import styles from "./eventCard.module.scss";
import { IEvent } from "@/lib/database/models/event.model";
import Link from "next/link";
import Image from "next/image";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { fetchUserId } from "@/lib/actions/authServer.actions";
import { Tooltip } from "@chakra-ui/react";

interface CardProps {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
}

interface userIdType{
  userId: string
}

export default function EventCard({
  event,
  hasOrderLink,
  hidePrice,
}: CardProps) {
 
  const [userId, setUserId] = useState<string | null>(null)
  

  const isEventCreater:boolean  = userId === event.organizer?._id.toString();

  


  useEffect(() =>{
    const getUserId = async () => {
      const currentUserId = await fetchUserId();
      if(currentUserId === undefined)
        setUserId(null)
      else 
        setUserId(currentUserId)
    }

    getUserId();
  },[])

  return (
    <Link className={styles.container}  href={`/events/${event._id}`}>{ isEventCreater ? (
      <>
      <Tooltip hasArrow label='Edit Event' bg='gray.300' placement='bottom' color='black'>
      <div className={styles.editEvent}>
  
      <Link href={`/events/${event._id}/update`}>
       
       <Image src='/assets/icons/edit.svg' alt='edit' fill />
       </Link>

   
      </div>
      </Tooltip>
      <Tooltip hasArrow label='Order Details' bg='gray.300' placement='bottom' color='black'>
      <div className={styles.orderDetails}>
  
      <Link href={`/orders?eventId=${event._id}`}>
       
       <Image src='/assets/icons/pointer.svg' alt='edit' fill />
       </Link>

   
      </div>
    </Tooltip>
      </>
      
    ) : null}

        <div className={styles.posterContainer}>
          <div
            className={styles.posterImg}
            style={{ backgroundImage: `url(${event.imageUrl})` }}
          />
          <Image src={event.imageUrl} alt="poster image" fill />
        </div>
        <div className={styles.priceAndCategory}>
            <p><span>{event.price === '' ? 'Free' : `₹ ${event.price}`}</span></p>
            <p>
                <span>
                    {event.category?.name}
                </span>
            </p>
        </div>
        <div className={styles.date}>
          {formatDateTime(event.startDateTime).dateTime}
        </div>
        <div className={styles.title}>
          {event.title}
        </div>
        <div className={styles.nameAndUsername}>
          <p>{event.organizer?.firstName}</p> <p>|</p> <p>{event.organizer?.username}</p>
        </div>
    
    </Link>
  );
}
