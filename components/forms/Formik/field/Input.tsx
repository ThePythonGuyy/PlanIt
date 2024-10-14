import { ErrorMessage, Field, FieldInputProps, FormikProps } from "formik";
import React from "react";
import TextError from "../TextError";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { Input as ChakraInput } from "@chakra-ui/react";
import Image from "next/image";

interface InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  fieldStyle?: string;
  variant?: string;
  focusBorderColor?: string;
  icon?: string;
  iconSize?: number;
  setInputValue?: React.Dispatch<React.SetStateAction<string>>;
}

function Input(props: InputProps) {
  const { name, label, fieldStyle, icon, iconSize, setInputValue, ...rest } = props;

  return (
    <Field name={name}>
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
            {icon && (
              <Image
                src={icon}
                alt={name}
                width={iconSize}
                height={iconSize}
              />
            )}
            <ChakraInput
              id={name}
              {...field}
              {...rest}
              onChange={(e) => {
                field.onChange(e); // Update Formik state
                if (setInputValue) {
                  setInputValue(e.target.value); // Update external state if setInputValue is provided
                }
              }}
            />
            {typeof form.errors[name] === "string" && (
              <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
            )}
          </FormControl>
        );
      }}
    </Field>
  );
}

export default Input;
