"use client";

import { eventDefaultValues } from "@/constants";
import { addNewCategoryForm, eventFormValidationSchema } from "@/lib/validator";
import * as Yup from "yup";
import { Formik, Form, getActiveElement } from "formik";
import FormikControl from "../Formik/FormikControl";
import styles from "./eventForm.module.scss";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import AddCategory from "./AddCategory";
import {
  createCategory,
  getAllCategories,
} from "@/lib/actions/category.action";
import { useRouter } from "next/navigation";
import {
  createEvent,
  getEventById,
  deleteEvent,
  updateEvent,
} from "@/lib/actions/event.action";
import { Event, UpdateEvent } from "@/types";

interface EventFormProps {
  userId: string;
  type: "create" | "update";
  eventInitialValues: UpdateEvent;
  eventId?: string;
}

interface Option {
  label: string;
  value: string;
}

const isOnlinecheckOptions = {
  key: "Online",
  value: true,
};

const isFreecheckOptions = {
  key: "Free",
  value: true,
};

export default function EventForm({
  userId,
  type,
  eventInitialValues,
  eventId,
}: EventFormProps) {
  const [image, setImage] = useState<File | null>(null);
  const [categoryList, setCategoryList] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { edgestore } = useEdgeStore();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();

  const cancelRef = React.useRef(null);

  const addCategory = () => {
    onOpen();
  };

  const addCategorySubmit = async (
    newCategory: Yup.InferType<typeof addNewCategoryForm>
  ) => {
    console.log(newCategory);
    onClose();
    const newCategoryDb = await createCategory(newCategory.category);

    setCategoryList((prevState) => [
      ...prevState,
      { label: newCategoryDb.name, value: newCategoryDb._id },
    ]);
  };

  const onSubmit = async (
    values: Yup.InferType<typeof eventFormValidationSchema>,
    { resetForm }: { resetForm: () => void }
  ) => {
    setIsLoading(true);
    let res;
    if (image) {
      res = await edgestore.publicFiles.upload({
        file: image,
        onProgressChange: (progress) => {
          console.log(progress);
        },
      });
    }
    if (type == "create") {
      try {
        // This is for creating an event
        const newEvent = await createEvent({
          event: {
            title: values.title,
            description: values.description,
            location: values.isOnline == true ? "" : values.location,
            startDateTime: values.startDateTime,
            endDateTime: values.endDateTime,
            imageUrl: res?.url as string,
            categoryId: values.categoryId as string,
            isFree: values.isFree as boolean,
            price: values.isFree === true ? "" : (values.price as string),
            url: values.isOnline === true ? values.url : "",
          },
          userId,
          path: "/profile",
        });

        if (newEvent) {
          setIsLoading(false);
          resetForm();
          router.push(`/events/${newEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    } else if (type == "update" && eventId) {
      try {
        const updatedEvent = await updateEvent({
          event: {
            _id: eventId,
            title: values.title,
            description: values.description,
            location: values.isOnline == true ? "" : values.location,
            startDateTime: values.startDateTime,
            endDateTime: values.endDateTime,
            categoryId: values.categoryId as string,
            isFree: values.isFree as boolean,
            price: values.isFree === true ? "" : (values.price as string),
            url: values.isOnline === true ? values.url : "",
            imageUrl: image ? (res?.url as string) : values.imageUrl,
          },
          path: `/events/${eventId}`,
          userId: userId,
        });

        if (updatedEvent) {
          setIsLoading(false);
          resetForm();
          router.push(`/events/${eventId}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteCurrentEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    onCloseAlert();
    try {
      if (eventId) {
        await deleteEvent({ eventId, path: "/" });
      } else {
        throw new Error(`EventId missing or EventId : ${eventId} missing`);
      }
    } catch (error) {
      console.log(error);
    }

    router.push("/");
  };


  useEffect(() => {
    const getCategories = async () => {
      const result = await getAllCategories();
      const transformedData = result.map((item: any) => ({
        label: item.name,
        value: item.name,
      }));

      setCategoryList([{label: 'Add new Category', value: 'edit317'},...transformedData, ]);

  
    };
    getCategories();
  }, []);
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
    <React.Fragment>
      <Formik
        initialValues={eventInitialValues}
        validationSchema={eventFormValidationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className={styles.formContainer}>
            <div className={styles.fieldWrapper}>
              <FormikControl
                control="input"
                name="title"
                placeholder="Event Title"
                type="text"
                variant="filled"
                fieldStyle={styles.inputField}
                focusBorderColor="gray.400"
              />
              <FormikControl
                control="select"
                name="categoryId"
                placeholder="Category"
                variant="filled"
                fieldStyle={styles.selectField}
                focusBorderColor="gray.400"
                dropDownOptions={categoryList}
                addCategory={addCategory}
              />
            </div>
            <div className={styles.fieldWrapper} style={{ height: "200px" }}>
              <FormikControl
                control="textarea"
                name="description"
                placeholder="Event Description"
                variant="filled"
                fieldStyle={styles.textAreaField}
                focusBorderColor="gray.400"
              />

              <FormikControl
                control="image"
                name="imageUrl"
                fieldStyle={styles.imageField}
                setImage={setImage}
                currentImage={eventInitialValues.imageUrl}
              />
            </div>
            <div className={styles.checkWrapper}>
              <FormikControl
                control="checkbox"
                name="isOnline"
                checkOptions={isOnlinecheckOptions}
                fieldStyle={styles.checkBoxField}
              />
              <div className={styles.fieldWrapper}>
                <FormikControl
                  control="input"
                  name="location"
                  placeholder="Location"
                  type="text"
                  variant="filled"
                  fieldStyle={styles.inputField}
                  focusBorderColor="gray.400"
                  disabled={formik.values.isOnline === true}
                  icon="/assets/icons/location-grey.svg"
                  iconSize={20}
                />

                <FormikControl
                  control="input"
                  name="url"
                  placeholder="Url"
                  type="string"
                  variant="filled"
                  fieldStyle={styles.inputField}
                  disabled={formik.values.isOnline === false}
                  focusBorderColor="gray.400"
                  icon="/assets/icons/link.svg"
                  iconSize={20}
                />
              </div>
            </div>

            <div className={styles.fieldWrapper}>
              <FormikControl
                name="startDateTime"
                control="date"
                placeholder="Start Date : "
                fieldStyle={styles.datePicker}
                icon="/assets/icons/calendar.svg"
                iconSize={20}
              />

              <FormikControl
                name="endDateTime"
                control="date"
                placeholder="End Date : "
                fieldStyle={styles.datePicker}
                icon="/assets/icons/calendar.svg"
                iconSize={20}
              />
            </div>
            <div className={styles.checkWrapper}>
              <FormikControl
                control="checkbox"
                name="isFree"
                checkOptions={isFreecheckOptions}
                fieldStyle={styles.checkBoxField}
              />
              <div className={styles.fieldWrapper}>
                <FormikControl
                  control="input"
                  name="price"
                  placeholder="Price"
                  type="text"
                  variant="filled"
                  fieldStyle={styles.inputField}
                  disabled={formik.values.isFree === true}
                  focusBorderColor="gray.400"
                  icon="/assets/icons/rupee.svg"
                  iconSize={20}
                />
              </div>
            </div>
            {type === "update" ? (
              <div className={styles.updateBtn}>
                <Button
                  borderRadius="full"
                  onClick={(e) => {
                    onOpenAlert();
                  }}
                >
                  Delete Event
                </Button>
                <Button type="submit" borderRadius="full">
                  Update Event
                </Button>
              </div>
            ) : (
              <Button
                type="submit"
                borderRadius="full"
                className={styles.createBtn}
              >
                Create Event
              </Button>
            )}
          </Form>
        )}
      </Formik>

      <AddCategory
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        addCategorySubmit={addCategorySubmit}
        dropDownOptions={categoryList}
      />

      <>
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onCloseAlert}
          isOpen={isOpenAlert}
          isCentered
        >
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogHeader>Proceed to delete</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Are you sure you want to delete the event?.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseAlert}>
                No
              </Button>
              <Button colorScheme="red" ml={3} onClick={deleteCurrentEvent}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    </React.Fragment>
  );
}
