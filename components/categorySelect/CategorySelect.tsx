"use client";

import React, { useEffect } from "react";
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
  const initialValues = {
    category: "",
  };
  const searchParams = useSearchParams();
  const router = useRouter();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values); // Log form values on submit
      }}
    >
      {({ values }) => {
        useEffect(() => {
          let newUrl = "";
          const delayDebounce = setTimeout(() => {
            if (values.category) {
              newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "category",
                value: values.category.toString(),
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
        }, [values.category, router, searchParams]);

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
