
import React from "react";
import styles from '../../event.module.scss';
import { auth, currentUser } from '@clerk/nextjs/server'
import EventForm from "@/components/forms/eventForm/EventForm";
import { getEventById } from "@/lib/actions/event.action";
import { Event } from "@/types";

type UpdateEventProps = {
  params:{
    id: string
  }
}

interface userIdType{
  userId: string
}


export default async function UpdateEvent({params: {id}}:UpdateEventProps) {
  const { sessionClaims } = auth()
  const userId: userIdType = sessionClaims?.userId as userIdType;

  const event: Event = await getEventById(id);
  console.log(event);
  const updateEventDefault = {
    title: event.title,
    description: event.description,
    location: event.location || '',
    isOnline: event.url ? true : false,
    imageUrl: event.imageUrl,
    startDateTime: new Date(event.startDateTime),
    endDateTime: new Date(event.endDateTime),
    categoryId: event.category._id,
    price: event.price,
    isFree: event.price ? false : true,
    url: event.url || '',
  }
  return (
    <div className={styles.createEventContainer}>
      <section className={styles.createEventHead}>
        <h3>Update Event</h3>
      </section>

      <div className={styles.createEventForm}>
        <EventForm userId={userId.userId as string} type="update"  eventInitialValues={updateEventDefault} eventId={id} />
      </div>
    </div>
  );
}
