import React from "react";

import Input from "./field/Input";
import Textarea from "./field/Textarea";
import Select from "./field/Select";
import ImageFile from "./field/ImageFile";
import CheckBox from "./field/CheckBox";
import DatePicker from "./field/DatePicker";

interface FormikControlProps {
  control:
    | "input"
    | "textarea"
    | "select"
    | "radio"
    | "checkbox"
    | "date"
    | "image";
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  fieldStyle?: string;
  variant?: string;
  focusBorderColor?: string;
  options?: { key: string; value: string }[];
  dropDownOptions?: { label: string; value: string }[];
  checkOptions?:
    | {
        key: string;
        value: any;
      }[]
    | {
        key: string;
        value: any;
      };
  icon?: string;
  iconSize?: number;
  setImage?: React.Dispatch<React.SetStateAction<File | null>>;
  setSelectValue?: React.Dispatch<React.SetStateAction<string>>;
  setInputValue?: React.Dispatch<React.SetStateAction<string>>;
  addCategory?:() => void;
  currentImage?: string | null;
  
}

function FormikControl(props: FormikControlProps) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "image":
      return <ImageFile {...rest} />;

    // case 'radio':
    //     return <Radio {...rest} />
    case "checkbox":
      return <CheckBox {...rest} />;
    case "date":
      return <DatePicker {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
