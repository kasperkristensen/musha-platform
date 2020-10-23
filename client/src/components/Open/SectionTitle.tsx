import React from "react";
import styled from "styled-components";

interface SectionTitleProps {
  main: string;
  tagline?: string;
}

const StyledSectionTitle = styled.p`
  color: var(--black);
  font-weight: 600;
  font-size: 26px;
  margin: 20px 0;
`;

export const SectionTitle: React.FC<SectionTitleProps> = (props) => {
  return <StyledSectionTitle>{props.main}</StyledSectionTitle>;
};
