import { useField } from "formik";
import React from "react";
import styled from "styled-components";
import { MdErrorOutline } from "react-icons/md";

const ErrorDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: red;
  margin-top: 0.4rem;

  .icon {
    font-size: 18px;
    margin-right: 10px;
  }
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 2rem 0;
`;

const Input = styled.input`
  border: none;
  border-bottom: 2px solid var(--mainColor);
  outline: none;
  transition: var(--transition);
  padding: 0.5rem 0 0.5rem 0;

  &:focus {
    border-bottom: 2px solid var(--blue);
  }
`;

interface InputFieldProps {
  name: string;
  label: string;
  type?: string;
  autocomplete?: string;
}

const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, { error, touched }] = useField(props);
  return (
    <InputDiv>
      <label htmlFor={field.name}>{props.label}</label>
      <Input
        {...field}
        id={field.name}
        type={props.type}
        autoComplete={props.autocomplete}
      />
      {error && touched && (
        <ErrorDiv>
          <MdErrorOutline className="icon" />
          {error}
        </ErrorDiv>
      )}
    </InputDiv>
  );
};

export default InputField;
