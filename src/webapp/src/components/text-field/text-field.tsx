import React from "react";
import styled from "styled-components";

const Input = styled.input`
  padding: 5px 8px;
  font-size: 24px;
`;

interface TextFieldProps {
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField = ({ onChangeHandler }: TextFieldProps) => {
  return <Input onChange={onChangeHandler} />;
};

export default TextField;
