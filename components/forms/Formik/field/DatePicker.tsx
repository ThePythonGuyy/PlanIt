import { ErrorMessage, Field, FieldInputProps, FormikProps } from "formik";
import React from "react";
import DateView, { DatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextError from "../TextError";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";
import Image from "next/image";

interface dataPickerProps {
  name: string;
  label?: string;
  fieldStyle?: string;
  placeholder?: string;
  icon?: string;
  iconSize?: number;
}

interface ChakraInputProps extends InputProps {
  onClick?: React.MouseEventHandler<HTMLInputElement>;
}

const ChakraInput = React.forwardRef<HTMLInputElement, ChakraInputProps>(
  ({ onClick, ...props }, ref) => (
    <Input ref={ref} onClick={onClick} {...props} />
  )
);

// Set the display name for ChakraInput
ChakraInput.displayName = "ChakraInput";

function DatePicker(props: dataPickerProps) {
  const { name, label, fieldStyle, placeholder, icon, iconSize, ...rest } = props;

  return (
    <Field name={name}>
      {({
        form,
        field,
      }: {
        field: FieldInputProps<any>;
        form: FormikProps<any>;
      }) => {
        const { setFieldValue } = form;
        const { value } = field;

        return (
          <FormControl
            isInvalid={!!form.errors[name] && !!form.touched[name]}
            className={fieldStyle}
          >
            {icon && (
              <Image
                src={icon}
                alt={name}
                width={iconSize}
                height={iconSize}
              />
            )}

            <p>{placeholder}</p>
            <DateView
              id={name}
              {...field}
              {...rest}
              closeOnScroll={true}
              selected={value}
              onChange={(val) => setFieldValue(name, val)}
              showTimeSelect
              timeInputLabel="Time:"
              dateFormat="dd/MM/yyyy h:mm aa"
              wrapperClassName=".datePickerCustom"
              customInput={<ChakraInput width="100%" />}
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

export default DatePicker;
