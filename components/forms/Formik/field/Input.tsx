import { ErrorMessage, Field, FieldInputProps, FormikProps } from "formik";
import React from "react";
import TextError from "../TextError";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { Input as ChakraInput } from "@chakra-ui/react";
import { string } from "yup";
import Image from "next/image";

interface inputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?:boolean;
  fieldStyle?: string;
  variant?: string;
  focusBorderColor?: string;
  icon?: string;
  iconSize?: number;
}

function Input(props: inputProps) {
  const { name, label, fieldStyle, icon, iconSize,...rest } = props;
  return (
    <>
      <Field name={name} disabled >
        {({
          field,
          form,
        }: {
          field: FieldInputProps<any>;
          form: FormikProps<any>;
        }) => {
          return (
            <FormControl
              isInvalid={!!form.errors[name] && !!form.touched[name]}
              className={fieldStyle}
            >
              {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
              {icon &&   <Image
              src={icon}
              alt={name}
              width={iconSize}
              height={iconSize}
            />}
              <ChakraInput
                id={name}
                {...rest}
                {...field}
              />
              {typeof form.errors[name] === "string" && (
                <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
              )}
            </FormControl>
          );
        }}
      </Field>
    </>
  );
}

export default Input;
