import React from 'react'
import styles from './myProfile.module.scss'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import Collection from '@/components/collections/Collection'
import { fetchUserId } from '@/lib/actions/authServer.actions'
import { getEventsByUser } from '@/lib/actions/event.action'
import { getOrdersByUser } from '@/lib/actions/order.action'
import { IOrder } from '@/lib/database/models/order.model'

export default async function MyProfile() {
    const userId = await fetchUserId();
    if(!userId){
        return(null)
    }
    const organizedEvents = await getEventsByUser({ userId, page: 1})
   const orders = await getOrdersByUser({ userId, page: 1})

   const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
      return (
    <div className={styles.container}>
      <section className={styles.myTickets}>
        <div className={styles.head}>
            <h3>My Tickets</h3>
            <Link href='/'>
            <Button >Explore More Events</Button>
            </Link>
        </div>
        <div className={styles.events}>
        <Collection
          data={orderedEvents}
          emptyTitle={"No events purchased"}
          emptyStateSubText={"Purchase some events"}
          collectionType={"My_Tickets"}
          limit={6}
          page={1}
          totalPages={2}
          urlParamName='eventsPage'
        />
        </div>
      </section>
      <section className={styles.eventOrganized}>
      <div className={styles.head}>
            <h3>Event Organized</h3>
            <Link href='/events/create'>
            <Button >Create new Event</Button>
            </Link>
        </div>
        <div className={styles.events}>
        <Collection
          data={organizedEvents?.data}
          emptyTitle={"No events have been created yet"}
          emptyStateSubText={"Create some event now"}
          collectionType={"Events_Organized"}
          limit={6}
          page={1}
          totalPages={2}
          urlParamName='eventsPage'
        />
        </div>
        </section>
    </div>
  )
}
