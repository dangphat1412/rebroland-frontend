import React, { useState } from "react";
import {
  DatePickerContainer,
  DropdownContainer,
  ErrorMessage,
  FormContainer,
  InputContainer,
  SelectContainer,
  TextareaContainer,
} from "./input-field.styles";

const InputField = ({
  width,
  fieldType,
  error,
  label,
  sublabel,
  requiredField,
  children,
  ...props
}) => {
  const renderSwitch = (fieldType) => {
    switch (fieldType) {
      case "textarea":
        return <TextareaContainer {...props} />;
      case "select":
        return <SelectContainer {...props} />;
      case "datepicker":
        return <DatePickerContainer {...props} />;
      case "dropdown":
        return children ? (
          <DropdownContainer {...props}>{children}</DropdownContainer>
        ) : (
          <DropdownContainer {...props} />
        );
      default:
        return children ? (
          <InputContainer {...props}>{children}</InputContainer>
        ) : (
          <InputContainer {...props} />
        );
    }
  };
  return (
    <FormContainer width={width}>
      <label>
        {label} {requiredField && <span className="required">*</span>}
      </label>
      {renderSwitch(fieldType)}
      <label style={{ fontWeight: "none", fontSize: "12px" }}>{sublabel}</label>
      {error && (
        <ErrorMessage basic color="red">
          {error.message}
        </ErrorMessage>
      )}
    </FormContainer>
  );
};

export default InputField;
