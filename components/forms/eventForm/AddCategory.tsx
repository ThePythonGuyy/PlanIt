"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik, Form, useFormikContext } from "formik";
import FormikControl from "../Formik/FormikControl";
import React, { useEffect } from "react";
import styles from "./eventForm.module.scss";
import { addNewCategoryForm } from "@/lib/validator";
import { error } from "console";
import Category from "@/lib/database/models/category.model";

interface ModalProps {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
  addCategorySubmit: (value: Yup.InferType<typeof addNewCategoryForm>) => void;
  dropDownOptions: {
    label: string;
    value: string;
  }[];
}

interface WatchCategoryProps {
  dropDownOptions: {
    label: string;
    value: string;
  }[];
}

interface FormValues {
  category: string;
}

const AddCategory = ({
  onOpen,
  onClose,
  isOpen,
  addCategorySubmit,
  dropDownOptions,
}: ModalProps) => {
  const initialValues: FormValues = {
    category: "",
  };

  const validate = (values: FormValues) => {
    const errors: { category?: string } = {};

    if (!values.category) {
      errors.category = "Add a new Category";
    } else if (
      dropDownOptions.some(
        (option) => option.label.toLowerCase() === values.category.toLowerCase()
      )
    ) {
      errors.category = "This category already exists";
    }

    return errors;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <Formik
        initialValues={initialValues}
        // validationSchema={addNewCategoryForm}
        validate={validate}
        onSubmit={addCategorySubmit}
      >
        {(formik) => {
          
          return (
            <Form className={styles.form}>
              <ModalContent>
                <ModalHeader>Add New Category</ModalHeader>
                <ModalCloseButton colorScheme="purple" />
                <ModalBody>
                  <FormikControl
                    control="input"
                    name="category"
                    placeholder="New Category"
                    focusBorderColor="gray.400"
                  />
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="purple"
                    variant="outline"
                    mr={3}
                    onClick={onClose}
                    className={styles.modelButtonClose}
                  >
                    Close
                  </Button>
                  <Button
                    type="submit"
                    colorScheme="purple"
                    className={styles.modelButtonAdd}
                  >
                    Add Category
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default AddCategory;
