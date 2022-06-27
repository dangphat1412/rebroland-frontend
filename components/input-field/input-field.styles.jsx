import { Form, Label } from "semantic-ui-react";
import styled from "styled-components";

export const FormContainer = styled(Form.Field)`
  .required {
    color: red;
  }
`;

export const InputContainer = styled(Form.Input)`
  margin-bottom: 0px !important;
`;

export const TextareaContainer = styled(Form.TextArea)`
  margin-bottom: 0px !important;
`;

export const SelectContainer = styled(Form.Select)`
  margin-bottom: 0px !important;
`;

export const DropdownContainer = styled(Form.Dropdown)`
  margin-bottom: 0px !important;
`;

export const ErrorMessage = styled(Label)`
  border: none !important;
  padding-left: 0px !important;
`;
