import React from 'react'
import styles from './relatedEvents.module.scss'
import Collection from '../collections/Collection'
import { getAllEvents, getRelatedEventsByCategory } from '@/lib/actions/event.action';

type RelatedEventsProps = {
  eventId: string,
  categoryId:string,
}

export default async function RelatedEvents({eventId, categoryId} : RelatedEventsProps) {

  const eventList = await getRelatedEventsByCategory({
  eventId,
  categoryId,
    page:1,
    limit: 3,
  });

  return (
    <div className={styles.container}>
      <h2>Related Events</h2>
    <div className={styles.eventsWrapper}>
      { eventList && 
          <Collection
          data={eventList.data}
          emptyTitle={"No Events Found"}
          emptyStateSubText={"Come back later"}
          collectionType={"All_Events"}
          limit={3}
          page={1}
          totalPages={2}
        />
      }

    </div>
    </div>
  )
}
