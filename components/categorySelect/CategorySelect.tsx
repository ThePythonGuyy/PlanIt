"use client";

import React, { useEffect, useState } from "react";
import styles from "./categorySelect.module.scss";
import { Form, Formik } from "formik";
import { initialize } from "next/dist/server/lib/render-server";
import FormikControl from "../forms/Formik/FormikControl";
import { string } from "zod";
import { useSearchParams, useRouter } from "next/navigation";

import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

type CategorySelectProps = {
  categoryList: {
    label: string;
    value: string;
  }[];
};
export default function CategorySelect({ categoryList }: CategorySelectProps) {
  const [category, setCategory] = useState<string>('');
  const initialValues = {
    category: "",
  };
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    let newUrl = "";
    const delayDebounce = setTimeout(() => {
      if (category) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "category",
          value: category.toString(),
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["category"],
        });
      }
      router.push(newUrl, { scroll: false });
    }, 500);
    console.log(newUrl);
    return () => clearTimeout(delayDebounce);
  },[category, router, searchParams])
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values); // Log form values on submit
      }}
    >
      {({ values }) => {
        useEffect(() => {
         setCategory(values.category)
        }, [values.category]);

        return (
          <Form className={styles.form}>
            <FormikControl
              control="select"
              name="category"
              placeholder="Category"
              variant="filled"
              fieldStyle={styles.selectField}
              focusBorderColor="gray.400"
              dropDownOptions={categoryList}
            />
          </Form>
        );
      }}
    </Formik>
  );
}
