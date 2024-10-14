import { ErrorMessage, Field, FieldInputProps, FormikProps } from "formik";
import React from "react";
import TextError from "../TextError";
import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  CheckboxGroup,
  Stack,
} from "@chakra-ui/react";

interface CheckBoxProps {
  name: string;
  label?: string;
  checkOptions?:
    | {
        key: string;
        value: any;
      }[]
    | {
        key: string;
        value: any;
      };
  fieldStyle?: string;
  disabled?: boolean;
}

function CheckBox(props: CheckBoxProps) {
  const { name, label, checkOptions, fieldStyle, disabled, ...rest } = props;
  console.log('in checkbom')

  if (!checkOptions) {
    console.log("checkbox option prop missing");
    return null;
  }

  return (
    <Field name={name} >
      {({
        field,
        form,
      }: {
        field: FieldInputProps<any>;
        form: FormikProps<any>;
      }) => {
        const error = form.errors[name];
        const touched = form.touched[name];

        if (Array.isArray(checkOptions)) {
          return (
            <FormControl isInvalid={!!error && !!touched}>
              {label && <FormLabel htmlFor={name}>{label}</FormLabel>}

              <CheckboxGroup
                value={field.value}
                onChange={(value) => form.setFieldValue(name, value)}
              >
                <Stack direction="column">
                  {Array.isArray(checkOptions) &&
                    checkOptions.map((option) => (
                      <Checkbox
                        key={option.value}
                        id={option.value}
                        {...field}
                        value={option.value}
                        isChecked={field.value.includes(option.value)}
                        className={fieldStyle}
                      >
                        {option.key}
                      </Checkbox>
                    ))}
                </Stack>
              </CheckboxGroup>

              {typeof error === "string" && (
                <FormErrorMessage>{error}</FormErrorMessage>
              )}
            </FormControl>
          );
        } else {
            return (
                <FormControl isInvalid={!!error && !!touched}>
                {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
    
                {/* Render a single Chakra UI Checkbox */}
                <Checkbox
                  id={checkOptions.key}
                  isChecked={field.value === checkOptions.value}
                  {...field}
                  value={checkOptions.value}
                  onChange={(e) =>
                    form.setFieldValue(name, e.target.checked ? checkOptions.value : false)
                  }
                  className={fieldStyle}
                  colorScheme='purple'
                  
                >
                  {checkOptions.key}
                </Checkbox>
    
                {typeof error === 'string' && (
                  <FormErrorMessage>{error}</FormErrorMessage>
                )}
              </FormControl>
            )
        }
      }}
    </Field>
  );
}

export default CheckBox;
