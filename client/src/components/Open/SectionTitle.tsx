import React from "react";
import styled, { css } from "styled-components";

interface SectionTitleProps {
  main: string;
  tagline?: string;
  size: string;
}

const StyledSectionTitle = styled.p.attrs((props) => ({
  size: props.size,
}))`
  color: var(--black);
  font-weight: 600;
  margin: 20px 0;

  ${(props) =>
    props.size === "large" &&
    css`
      font-size: 26px;
    `}
  ${(props) =>
    props.size === "small" &&
    css`
      font-size: 18px;
    `}
`;

export const SectionTitle: React.FC<SectionTitleProps> = ({
  size = "small",
  ...props
}) => {
  return <StyledSectionTitle size={size}>{props.main}</StyledSectionTitle>;
};
