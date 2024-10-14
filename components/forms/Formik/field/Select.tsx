import React, { useEffect } from "react";
import { Field, FieldInputProps, FormikProps } from "formik";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import Select from "react-select";
import { components } from "react-select";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  fieldStyle?: string;
  variant?: string;
  focusBorderColor?: string;
  dropDownOptions?: SelectOption[];
  addCategory?:() => void;
}

const CustomSelect = (props: SelectProps) => {
  const { name, label, dropDownOptions, fieldStyle, addCategory, ...rest } = props;
  // console.log(dropDownOptions);
  return (
    <Field name={name}>
      {({
        field,
        form,
      }: {
        field: FieldInputProps<any>;
        form: FormikProps<any>;
      }) => {
        const handleChange = (option: any) => {
          form.setFieldValue(name, option ? option.value : "");
          // console.log("selected", option);
          if(option.value === "edit317" && addCategory)
          {
            form.setFieldValue(name, "");
            addCategory();
          }
        };

        const customStyles = {
          control: (provided: any, state: any) => ({
            ...provided,
            outline: "pink",
            width: "100%",
            height: "40px",
            backgroundColor: "#edf2f7",
            borderColor: "#718096",
            boxShadow: "none",
            "&:hover": {
              borderColor: state.isFocused
                ? "#718096"
                : form.errors[name] && form.touched[name]
                ? "red"
                : "transparent",
            },
          }),
          menu: (provided: any) => ({
            ...provided,
            zIndex: 100,
          }),
          option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isSelected
              ? "#fff"
              : state.isFocused
              ? "#EDF2F7"
              : "#F6F8FD",
            color: state.isSelected ? "#000" : "#000",
          }),
          singleValue: (provided: any) => ({
            ...provided,
            color: "#000",
          }),
          placeholder: (provided: any) => ({
            ...provided,
            color: "#718096",
          }),
        };



        return (
          <FormControl isInvalid={!!form.errors[name] && !!form.touched[name]}  className="formik-control" >
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <Select
              id={name}
              // className={fieldStyle}
              placeholder={props.placeholder}
              options={dropDownOptions}
              value={dropDownOptions?.find(
                (option) => option.value === field.value
              )}
              onChange={handleChange}
              styles={customStyles}
              {...rest}
            />
            {typeof form.errors[name] === "string" && (
              <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
            )}
          </FormControl>
        );
      }}
    </Field>
  );
};

export default CustomSelect;
