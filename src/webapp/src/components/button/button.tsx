import React from "react";
import styled from "styled-components";

const ButtonComponent = styled.button`
  height: 42px;
  font-size: 24px;
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
