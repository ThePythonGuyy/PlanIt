import { ErrorMessage, Field, FieldInputProps, FormikProps } from "formik";
import React from "react";
import TextError from "../TextError";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { Textarea as ChakraTextarea} from '@chakra-ui/react'
import { string } from "yup";

interface TextareaProps {
  name: string;
  label?: string;
  placeholder?: string;
  fieldStyle?: string;
  variant?: string;
  focusBorderColor?:string;
}

function Textarea(props: TextareaProps) {
  const { name, label,fieldStyle, ...rest } = props;
  return (
    <>
      <Field name={name} >
        {({
          field,
          form,
        }: {
          field: FieldInputProps<any>;
          form: FormikProps<any>;
        }) => {
          return (
            <FormControl isInvalid={(!!form.errors[name] && !!form.touched[name])} 
            className="formik-control">
             { label && <FormLabel htmlFor={name}>{label}</FormLabel> }
              <ChakraTextarea id={name} className={fieldStyle} {...rest} {...field}  />
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

export default Textarea;
