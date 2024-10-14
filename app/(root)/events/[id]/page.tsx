import { getEventById } from "@/lib/actions/event.action";
import { SearchParamProps } from "@/types";
import React from "react";
import styles from "./eventDetails.module.scss";
import Image from "next/image";
import { longway, revans } from "@/styles/font";
import { formatDateTime } from "@/lib/utils";
import { Button, Tooltip} from "@chakra-ui/react";
import Link from "next/link";
import { fetchUserId } from "@/lib/actions/authServer.actions";
import RelatedEvents from "@/components/relatedEvents/RelatedEvents";
import EventButton from "@/components/eventButtons/EventButton";


export default async function EventDetails({
  params: { id },
}: SearchParamProps) {
  const event = await getEventById(id);
  const userId = await fetchUserId();

  const host = event?.organizer.firstName + " " + event?.organizer.lastName;
  const currentUserId = await fetchUserId();
  const isEventCreater:boolean  = currentUserId === event.organizer?._id.toString();


  return (
    <>
    <div className={`${styles.container} ${revans.className}`}>
 
      <div className={styles.eventDetails}>

      { isEventCreater ? (
      <Tooltip hasArrow label='Edit Event' bg='gray.300' placement='bottom' color='black'>
      <div className={styles.editEvent}>
  
      <Link href={`/events/${event._id}/update`}>
       
       <Image src='/assets/icons/edit.svg' alt='edit' fill />
       </Link>

   
      </div>
      </Tooltip>
    ) : null}
        <div className={styles.mainDetails}>
          <div className={styles.posterContainer}>
            <div
              className={styles.posterImg}
              style={{ backgroundImage: `url(${event.imageUrl})` }}
            />
            <Image src={event.imageUrl} alt="poster image" fill />
          </div>
          <div className={styles.mainSubDetails}>
            <div className={styles.priceNameWrapper}>
            <div className={styles.priceAndCategory}>
              <p>
    
                <span>{event.price === "" ? "Free" : `₹ ${event.price}`}</span>
              </p>
              <p>
                <span>{event.category?.name}</span>
              </p>
            </div>
            <div className={styles.nameAndUsername}>
              <p>Host : </p>
              <p>{`${event.organizer?.firstName} ${event.organizer?.lastName}`}</p>{" "}
              <p>|</p> <p>{event.organizer?.username}</p>
            </div>
            </div>
            <div className={styles.dates}>
            <p>
              <Image
                src="/assets/icons/calendar.svg"
                alt="calendar"
                width={20}
                height={20}
              />
              <span>starts at : </span>
              {`${formatDateTime(event.startDateTime).dateTime} `}
            </p>
            <p>
              <Image
                src="/assets/icons/calendar.svg"
                alt="calendar"
                width={20}
                height={20}
              />{" "}
              <span>ends at : </span>
              {`${formatDateTime(event.endDateTime).dateTime} `}
            </p>
          </div>
          <div className={styles.locationAndUrl}>
            {event.location ? (
              <p>
                <Image
                  src="/assets/icons/location.svg"
                  alt="calendar"
                  width={20}
                  height={20}
                />
                <span>{event.location}</span>
              </p>
            ) : (
              <p>
                <Image
                  src="/assets/icons/link.svg"
                  alt="calendar"
                  width={20}
                  height={20}
                />{" "}
                <span>Online</span>
              </p>
            )}
          </div>
          </div>
        </div>
        <div className={styles.addDetails}>
          <h2 className={longway.className}>{event.title}</h2>
          <p>{event.description}</p>
        <div className={styles.btn}>
       <EventButton userId={userId} event={event} />
    
        </div>
      
        </div>
      </div>
    </div>
    <RelatedEvents eventId={id} categoryId={event.category._id} />
    
  </>
  );
}
