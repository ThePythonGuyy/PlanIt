"use client";

import React, { useEffect, useState } from "react";
import styles from "./search.module.scss";
import { Form, Formik } from "formik";
import FormikControl from "../forms/Formik/FormikControl";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialValues = {
    searchText: "",
  };

  const [searchText, setSearchText] = useState(initialValues.searchText);

  useEffect(() => {
    let newUrl = "";

    const delayDebounce = setTimeout(() => {
      if (searchText) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "eventTitle",
          value: searchText.toString(),
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["eventTitle"],
        });
      }
      router.push(newUrl, { scroll: false });
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchText]); // Only depend on searchText

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values }) => {
        useEffect(() => {
          setSearchText(values.searchText);
        }, [values.searchText]);

        return (
          <Form className={styles.form}>
            <FormikControl
              control="input"
              name="searchText"
              placeholder="Search Event"
              type="text"
              variant="filled"
              fieldStyle={styles.inputField}
              focusBorderColor="gray.400"
              icon="/assets/icons/search.svg"
              iconSize={20}
            />
          </Form>
        );
      }}
    </Formik>
  );
}
