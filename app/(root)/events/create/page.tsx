import React from "react";
import styles from "../event.module.scss";
import { auth, currentUser } from '@clerk/nextjs/server'
import EventForm from "@/components/forms/eventForm/EventForm";
import { eventDefaultValues } from "@/constants";

interface userIdType{
  userId: string
}

export default function CreateEvent() {

  const { sessionClaims } = auth()
  const userId: userIdType = sessionClaims?.userId as userIdType;

  // const userId = "";
  return (
    <div className={styles.createEventContainer}>k
      <section className={styles.createEventHead}>
        <h3>Create Event</h3>
      </section>

      <div className={styles.createEventForm}>
        <EventForm userId={userId.userId as string} type="create" eventInitialValues = {eventDefaultValues} />
      </div>
    </div>
  );
}
