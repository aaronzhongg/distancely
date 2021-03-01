import React from "react";
import styled from "styled-components";

const Input = styled.input`
  padding: 5px 8px;
  font-size: 24px;
`;

interface TextFieldProps {
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPressHandler?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const TextField = ({ onChangeHandler, onKeyPressHandler }: TextFieldProps) => {
  return <Input onChange={onChangeHandler} onKeyPress={onKeyPressHandler} />;
};

export default TextField;
