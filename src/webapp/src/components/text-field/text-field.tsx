import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Input = styled.input``;

interface TextFieldProps {
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField = ({ onChangeHandler }: TextFieldProps) => {
  return <Input onChange={onChangeHandler} />;
};

export default TextField;
