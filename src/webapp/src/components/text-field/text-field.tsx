import React from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  display: inline-flex;
  position: relative;
  flex-direction: column;
  margin-top: 5px;
  margin-bottom: 5px;
  flex-grow: 1;
`;

const InputLabel = styled.label`
  margin: 0px 0px 5px 24px;
  font-weight: 500;
`;

const InputFieldWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const Input = styled.input`
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border: 1px solid black;
  text-transform: capitalize; // todo: conditional css
  border-radius: 28px;
  font-weight: 500;
  flex-grow: 1;

  &:focus {
    outline: none;
  }

  ::-webkit-input-placeholder {
    text-transform: initial;
  }

  :-moz-placeholder {
    text-transform: initial;
  }

  ::-moz-placeholder {
    text-transform: initial;
  }

  :-ms-input-placeholder {
    text-transform: initial;
  }
`;

// todo: primary / secondary
// todo: text position left/top
const IconButton = styled.button`
  position: absolute;
  right: 0px;
  border-radius: 24px;
  border: none;
  margin-right: 12px;
  height: 27px;
  width: 27px;
  background-color: #2ba84a;

  font-size: 20px;
  font-weight: 500;
  color: white;
`;

export interface TextFieldProps {
  style?: React.CSSProperties;
  // text field
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPressHandler?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyDownHandler?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholderText?: string;
  value?: string;
  labelText?: string;
  disabled?: boolean;

  // button
  onButtonClickHandler?: React.MouseEventHandler<HTMLButtonElement>;
  buttonText?: string;
}

const TextField = ({
  style,
  // text field
  onChangeHandler,
  onKeyPressHandler,
  onKeyDownHandler,
  placeholderText,
  value,
  labelText,
  disabled,

  // button
  onButtonClickHandler,
  buttonText,
}: TextFieldProps) => {
  return (
    <InputWrapper style={style}>
      <InputLabel>{labelText}</InputLabel>
      <InputFieldWrapper>
        <Input
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          onKeyDown={onKeyDownHandler}
          placeholder={placeholderText}
          value={value}
          disabled={disabled}
        />
        {buttonText && (
          <IconButton onClick={onButtonClickHandler}>{buttonText}</IconButton>
        )}
      </InputFieldWrapper>
    </InputWrapper>
  );
};

export default TextField;
