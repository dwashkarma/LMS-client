import TextField from "@mui/material/TextField";
import { ChangeEvent } from "react";

interface InputTypes {
  name: string;
  label: string;
  value: string;
  helperText?: string;
  errors?: boolean;
  type: string;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleBlur?: any;
}
const InputField: React.FC<InputTypes> = ({
  name,
  label,
  value,
  type,
  helperText,
  errors,
  handleChange,
  handleBlur,
}) => {
  return (
    <TextField
      name={name}
      value={value}
      label={label}
      type={type}
      variant="outlined"
      onBlur={handleBlur}
      onChange={handleChange}
      helperText={helperText}
      error={errors}
    />
  );
};

export default InputField;
