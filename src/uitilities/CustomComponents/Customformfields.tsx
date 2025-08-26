import { ChangeEvent, memo, useContext } from "react";
import { useState } from "react";
import { Controller, RegisterOptions } from "react-hook-form";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Autocomplete,
  AutocompleteProps,
  IconButton,
  TextField,
  TextFieldProps,
} from "@mui/material";

const textColorClass = "text-grey-500";
export type Radios = {
  label: string | number;
  value: string | number | boolean;
};

type CustomFormFieldType = {
  control: any;
  name: string;
  fieldProps: TextFieldProps;
  rules: RegisterOptions;
  element: "input" | "autocomplete" 
};

export type CustomAutocompleteType = CustomFormFieldType & {
  options: any[];
  loading?: boolean;
  autocompleteProps?: Omit<
    AutocompleteProps<any, boolean, boolean, boolean>,
    "renderInput" | "options"
  >;
};





export type TextFieldType = Omit<CustomFormFieldType, "control">;
export type AutocompleteType = Omit<
  CustomAutocompleteType,
  "control" | "options"
>;



export type PropType = CustomFormFieldType| CustomAutocompleteType
export const maxStringSize = 254;
const types = ["text", "password", "email", "number"]; // Define valid input types

const CustomFormField = memo((props: PropType) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [fieldError, setFieldError] = useState<string>("");
  const { control, name, rules, element, fieldProps } = props;

  return (
    <Controller
      control={control}
      name={name}
      rules={{...rules,maxLength: fieldProps?.InputProps?.inputProps?.maxLength || maxStringSize}}
      render={({
        field: { ref, onChange, value = null, ...field },
        fieldState: { error },
      }) => {
        if (element == "input") {
          return (
            <TextField
              {...fieldProps}
              {...field}
              label={
                <span className={textColorClass}>
                  {fieldProps.label}
                  {rules?.required && <span className="text-red-500">*</span>}
                </span>
              }
              error={!!error || Boolean(fieldError)}
              helperText={error?.message || fieldError}
              type={showPassword ? "text" : fieldProps.type}
              value={value || ""}
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                onChange(e.target.value);
                value?.length >
                (fieldProps.InputProps?.inputProps?.maxLength || maxStringSize)
                  ? setFieldError(`Maximum characters ${maxStringSize}`)
                  : setFieldError("");
              }}
              InputProps={{
                ...fieldProps.InputProps,
                endAdornment:
                  fieldProps.type === "password" ? (
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  ) : (
                    fieldProps.InputProps?.endAdornment || <></>
                  ),
                inputProps: {
                  maxLength: maxStringSize, // Set the max length here
                  ...fieldProps.InputProps?.inputProps,
                },
              }}
              InputLabelProps={
                types.includes(fieldProps.type as string)
                  ? { shrink: true }
                  : {}
              }
            />
          );
        }
     
        if (element == "autocomplete") {
          return (
            <Autocomplete
              {...field}
              {...(props as CustomAutocompleteType).autocompleteProps}
              options={(props as CustomAutocompleteType).options || []}
              value={value || null}
              onChange={(_, data) => {
                onChange(data || null);
              }}
              loading={(props as CustomAutocompleteType)?.loading}
              renderInput={(params) => (
                <TextField
                  inputRef={ref}
                  {...params}
                  {...field}
                  {...fieldProps}
                  label={
                    <span className={textColorClass}>
                      {fieldProps.label}{" "}
                      {rules.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </span>
                  }
                  error={!!error}
                  helperText={error?.message || ""}
                />
              )}
            />
          );
        }
        return <div></div>;
      }}
    />
  );
});

export { CustomFormField };