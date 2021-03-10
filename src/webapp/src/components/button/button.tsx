import React from "react";
import styled from "styled-components";

const ButtonComponent = styled.button`
  height: 42px;
  font-size: 24px;
  border-radius: 21px;
  border: 0px;
  background-color: #2ba84a;
  color: white;
`;

interface ButtonProps {
  onClickHandler?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  children: string;
}

const Button = ({ onClickHandler, children }: ButtonProps) => {
  return <ButtonComponent onClick={onClickHandler}>{children}</ButtonComponent>;
};

export default Button;
