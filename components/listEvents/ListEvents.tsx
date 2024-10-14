"use client";

import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import FormikControl from "../forms/Formik/FormikControl";
import styles from "./listEvents.module.scss";
import { getAllCategories } from "@/lib/actions/category.action";
import Collection from "../collections/Collection";
import { getAllEvents } from "@/lib/actions/event.action";
import { IEvent } from "@/lib/database/models/event.model";
import { Spinner } from "@chakra-ui/react";
import Search from "../search/Search";
import CategorySelect from "../categorySelect/CategorySelect";
import { SearchParamProps } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

interface Option {
  label: string;
  value: string;
}

export default function ListEvents() {
  const searchParams = useSearchParams();
  const [categoryList, setCategoryList] = useState<Option[]>([]);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState<number>();

  const page = Number(searchParams.get("page")) || 1;
  const searchText = searchParams.get("eventTitle") || "";
  const category = searchParams.get("category") || "";

  const router = useRouter();

  const onSubmit = (values: { search: string; category: string }) => {
    console.log(values);
  };

  useEffect(() => {
    const getCategories = async () => {
      const result = await getAllCategories();
      const transformedData = result.map((item: any) => ({
        label: item.name,
        value: item.name,
      }));

      setCategoryList([{ label: "All", value: "" }, ...transformedData]);
    };
    getCategories();
  }, []);

  useEffect(() => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: "1",
    });
    router.push(newUrl, { scroll: false });
  }, [searchText, category]);

  const fetchEvents = async (query: string, category: string, page: number) => {
    try {
      const eventList = await getAllEvents({
        query,
        category,
        page,
        limit: 6,
      });

      if (eventList?.data) {
        setEvents(eventList.data);
        setTotalPages(eventList?.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(searchText, category, page);
  }, [searchText, category, page, searchParams]);
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </div>
    );
  }
  return (
    <div className={styles.eventList}>
      <div className={styles.filter}>
        <Search />
        <CategorySelect categoryList={categoryList} />
      </div>
      <div className={styles.collection}>
        <Collection
          data={events}
          emptyTitle={"No Events Found"}
          emptyStateSubText={"Come back later"}
          collectionType={"All_Events"}
          limit={6}
          page={page}
          totalPages={totalPages}
          urlParamName="page"
        />
      </div>
    </div>
  );
}
