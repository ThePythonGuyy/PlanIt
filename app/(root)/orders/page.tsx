import React from "react";
import styles from "./ordersPage.module.scss";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { SearchParamProps } from "@/types";
import { getOrdersByEvent } from "@/lib/actions/order.action";
import { getEventById } from "@/lib/actions/event.action";
import Image from "next/image";
import { IOrderItem } from "@/lib/database/models/order.model";
import { formatDateTime } from "@/lib/utils";

export default async function OrdersPage({searchParams} : SearchParamProps) {
    const eventId = (searchParams?.eventId as string) || '';

    const orders = await getOrdersByEvent({eventId, searchString: ''}); 


    const event = await getEventById(eventId);

  
 

  return (
    <div className={styles.container}>
      <h2>Event Orders</h2>
      <div className={styles.details}>
        <div className={styles.eventDetails}>
          <h3>{event?.title}</h3>
        <div className={styles.posterContainer}>
          <div
            className={styles.posterImg}
            style={{ backgroundImage: `url(${event?.imageUrl})` }}
          />
          <Image src={event?.imageUrl} alt="poster image" fill />
        </div>
        </div>
        { orders.length > 0 ? (
                  <TableContainer className={styles.orderTable}>
                  <Table variant="simple">
                    {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                    <Thead>
                      <Tr className={styles.headRow}>
                        <Th>Order ID</Th>
                        <Th>Buyer</Th>
                        <Th >Purchased On</Th>
                        <Th >Amount</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                { orders?.map((order:IOrderItem) => (
                 <Tr key={order._id}>
                 <Td>{order._id}</Td>
                 <Td>{order.buyer}</Td>
                 <Td> {formatDateTime(order.createdAt).dateTime}</Td>
                 <Td> {order.totalAmount}</Td>
               </Tr>
                ))}
          
               
                     
                    </Tbody>
                    {/* <Tfoot>
                      <Tr>
                        <Th>To convert</Th>
                        <Th>into</Th>
                        <Th isNumeric>multiply by</Th>
                      </Tr>
                    </Tfoot> */}
                  </Table>
                </TableContainer>
        )  : (
          <div className={styles.emptyContainer}>
          <h3>No orders yet</h3>
          <p>Expecting couple of orders soon</p>
        </div>
        )}

      </div>
  
    </div>
  );
}
