import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styled from "styled-components";

interface ArrowIconProps {
  direction: string;
  update: any;
  dis: boolean;
}

const IconContainer = styled.button`
  background-color: transparent;
  display: flex;
  border: none;
  align-items: center;
  margin: 0;
  padding: 0;
  outline: none;

  &::disabled {
    color: var(--blue);
  }
`;

export const ArrowIcon: React.FC<ArrowIconProps> = (props) => {
  return props.direction === "right" ? (
    <IconContainer onClick={() => props.update()} disabled={props.dis}>
      <FaChevronRight />
    </IconContainer>
  ) : (
    <IconContainer onClick={() => props.update()} disabled={props.dis}>
      <FaChevronLeft />
    </IconContainer>
  );
};
