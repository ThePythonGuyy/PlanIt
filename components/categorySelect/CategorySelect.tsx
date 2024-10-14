"use client";

import React, { useEffect, useState } from "react";
import styles from "./categorySelect.module.scss";
import { Form, Formik } from "formik";
import FormikControl from "../forms/Formik/FormikControl";
import { useSearchParams, useRouter } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

type CategorySelectProps = {
  categoryList: {
    label: string;
    value: string;
  }[];
};

export default function CategorySelect({ categoryList }: CategorySelectProps) {
  const [category, setCategory] = useState<string>("");
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

    return () => clearTimeout(delayDebounce);
  }, [category, searchParams, router]);

  return (
    <Formik
      initialValues={{ category: "" }}
      onSubmit={(values) => {
        console.log(values); // Log form values on submit
      }}
    >
      {({ values }) => (
        <Form className={styles.form}>
          <FormikControl
            control="select"
            name="category"
            placeholder="Category"
            variant="filled"
            fieldStyle={styles.selectField}
            focusBorderColor="gray.400"
            dropDownOptions={categoryList}
            setSelectValue={setCategory}
          />
        </Form>
      )}
    </Formik>
  );
}
