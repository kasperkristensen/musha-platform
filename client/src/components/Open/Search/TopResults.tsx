import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import theme from "../../../styles/theme";
import IconLoader from "../../icons/loader";

interface TopResultsProps {
  type: string;
  query: string | null;
}

const Container = styled.div`
  grid-column: 1 / -1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  position: relative;
  min-height: 300px;
`;

const ChildrenContainer = styled.div`
  display: grid;
  column-gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  overflow-y: hidden;
  grid-auto-rows: 0;
  grid-template-rows: 1fr;
`;

const Top = styled.div`
  ${theme.mixins.flexBetween};
  align-items: center;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: var(--darkgrey);
  transition: var(--transition);
  outline: none;
  &:hover,
  &:focus {
    color: var(--mainColor);
  }
`;

export const TopResults: React.FC<TopResultsProps> = ({
  children,
  query,
  type,
}) => {
  const router = useRouter();
  return children ? (
    <Container>
      <Top>
        <h1>{`${type.charAt(0).toUpperCase()}${type.slice(1)}`}</h1>
        <Button onClick={() => router.push(`${type}/${query}`)}>See All</Button>
      </Top>
      <ChildrenContainer>{children}</ChildrenContainer>
    </Container>
  ) : (
    <IconLoader />
  );
};
