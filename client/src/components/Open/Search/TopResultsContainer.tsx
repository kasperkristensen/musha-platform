import React from "react";
import styled from "styled-components";

const TopContainer = styled.div`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
`;

const Container = styled.div`
  display: grid;
  column-gap: 24px;
  row-gap: 32px;
  grid-column: 1 / -1;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
`;

export const TopResultsContainer: React.FC = ({ children }) => {
  return (
    <TopContainer>
      <Container>{children}</Container>
    </TopContainer>
  );
};
