import React from "react";

import styles from "./collection.module.scss";
import { IEvent } from "@/lib/database/models/event.model";
import EventCard from "../shared/eventCard/EventCard";
import Pagination from "../pagination/Pagination";

interface CollectionProps {
  data: IEvent[] ;
  emptyTitle: string;
  emptyStateSubText?: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName: string;
  collectionType?: "Events_Organized" | "My_Tickets" | "All_Events";
}

export default function Collection({
  data,
  emptyTitle,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
  emptyStateSubText,
}: CollectionProps) {

  return( <>
  { data?.length > 0 ? (
    <div className={styles.container}>
      <ul className={styles.eventList}>
        {data.map((event) => {
          const hasOrderLink = collectionType === "Events_Organized";

          const hidePrice =  collectionType === "My_Tickets";

          return (
            <li className={styles.cardContainer} key={event._id}>
              <EventCard event={event} hasOrderLink={hasOrderLink} hidePrice={hidePrice}/>
            </li>
          )
        })}
      </ul>
      <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />
    </div>
  ): (
    <div className={styles.emptyContainer}>
      <h3>{emptyTitle}</h3>
      <p>{emptyStateSubText}</p>
    </div>
  )}
  </>);
}


