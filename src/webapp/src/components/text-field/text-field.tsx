import React from "react";
import styled from "styled-components";

const Input = styled.input`
  padding: 5px 8px;
  font-size: 24px;
  border: none;
  border-bottom: 2px solid black;

  &:focus {
    outline: none;
  }
`;

interface TextFieldProps {
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPressHandler?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const TextField = ({
  onChangeHandler,
  onKeyPressHandler,
  placeholder,
}: TextFieldProps) => {
  return (
    <Input
      onChange={onChangeHandler}
      onKeyPress={onKeyPressHandler}
      placeholder={placeholder}
    />
  );
};

export default TextField;
