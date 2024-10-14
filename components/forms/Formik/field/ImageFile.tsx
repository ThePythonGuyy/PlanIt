"use client";

import { ErrorMessage, Field, FieldInputProps, FormikProps } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";

import { useDropzone } from "react-dropzone";
import Image from "next/image";

interface inputProps {
  name: string;
  label?: string;
  fieldStyle?: string;
  setImage?: React.Dispatch<React.SetStateAction<File | null>>;
  currentImage?: string | null;
}

function ImageFile(props: inputProps) {
  const { name, label, fieldStyle, setImage, currentImage, ...rest } = props;

  const [filePreview, setFilePreview] = useState<string | null>(null);

  useEffect(() => {
    if (currentImage) {
      setFilePreview(currentImage);
    }
  }, [currentImage]);

  // Moving the useCallback hook outside the Field component
  const onDrop = useCallback((acceptedFiles: File[], form: FormikProps<any>) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (setImage) {
        setImage(file);
      }
      form.setFieldValue(name, file.name);
      setFilePreview(URL.createObjectURL(file));
    }
  }, [setImage, name]);

  // useDropzone is now outside of Field as well
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0 && acceptedFiles[0]) {
        setFilePreview(URL.createObjectURL(acceptedFiles[0]));
      }
    },
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
  });

  return (
    <Field name={name}>
      {({
        field,
        form,
      }: {
        field: FieldInputProps<any>;
        form: FormikProps<any>;
      }) => (
        <FormControl
          isInvalid={!!form.errors[name] && !!form.touched[name]}
          className="formik-control"
        >
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          {filePreview ? (
            <div className={fieldStyle}>
              <Image src={filePreview} alt="Image preview" fill />
              <button onClick={() => setFilePreview(null)}>
                <Image
                  src="/assets/icons/delete.svg"
                  alt="delete"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          ) : (
            <div
              {...getRootProps({
                className: fieldStyle,
              })}
            >
              <Image
                src="/assets/icons/upload.svg"
                alt="upload icon"
                width={30}
                height={30}
              />
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the image here ...</p>
              ) : (
                <div>
                  <p>Drag photo here</p>
                  <Button size="xs">Select image</Button>
                </div>
              )}
            </div>
          )}

          {typeof form.errors[name] === "string" && (
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          )}
        </FormControl>
      )}
    </Field>
  );
}

export default ImageFile;
