import React from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  display: inline-flex;
  position: relative;
  align-items: center;
`;

const Input = styled.input`
  padding: 5px 8px;
  font-size: 24px;
  border: none;
  border-bottom: 2px solid black;
  text-transform: capitalize; // todo: conditional css

  &:focus {
    outline: none;
  }
`;

const IconButton = styled.button`
  position: absolute;
  right: 0px;
`;

export interface TextFieldProps {
  // text field
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPressHandler?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholderText?: string;

  // button
  onButtonPressHandler?: React.KeyboardEventHandler<HTMLButtonElement>;
  buttonText?: string;
}

const TextField = ({
  // text field

  onChangeHandler,
  onKeyPressHandler,
  placeholderText,

  // button
  onButtonPressHandler,
  buttonText,
}: TextFieldProps) => {
  return (
    <InputWrapper>
      <Input
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        placeholder={placeholderText}
      />
      {buttonText && (
        <IconButton onKeyPress={onButtonPressHandler}>{buttonText}</IconButton>
      )}
    </InputWrapper>
  );
};

export default TextField;
